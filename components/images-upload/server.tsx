"use server";

import prismadb from "@/lib/prismadb";
import {
  Bucket,
  DeleteObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  _Object,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { checkAdmin } from "../auth/checkAuth";

const accessKeyId = process.env.SCALEWAY_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.SCALEWAY_SECRET_ACCESS_KEY as string;
const bucketName = process.env.NEXT_PUBLIC_SCALEWAY_BUCKET_NAME as string;

const s3 = new S3Client({
  region: "fr-par",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: "https://s3.fr-par.scw.cloud",
});

type SignatureReturnType =
  | {
      success: true;
      data: {
        preSignedUrl: string;
      };
    }
  | {
      success: false;
      message: string;
    };
async function getSignature({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}): Promise<SignatureReturnType> {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return {
      success: false,
      message: "Vous devez être authentifier",
    };
  }
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: contentType,
    ACL: "public-read",
  });
  const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return {
    success: true,
    data: { preSignedUrl },
  };
}

type listBucketsReturnType =
  | {
      success: true;
      data: Bucket[];
    }
  | {
      success: false;
      message: string;
    };

async function listBuckets(): Promise<listBucketsReturnType> {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return {
      success: false,
      message: "Vous devez être authentifier",
    };
  }
  try {
    const response = await s3.send(new ListBucketsCommand({}));
    console.log("Buckets:");
    response.Buckets?.forEach((bucket) => {
      console.log(`- ${bucket.Name}`);
    });
    if (!response.Buckets) {
      return {
        success: false,
        message: "An error occurred",
      };
    }
    return {
      success: true,
      data: response.Buckets,
    };
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return { success: false, message: "An error occurred" };
  }
}

type listFilesReturnType =
  | {
      success: true;
      data: _Object[];
    }
  | {
      success: false;
      message: string;
    };

async function listFiles(): Promise<listFilesReturnType> {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return {
      success: false,
      message: "Vous devez être authentifier",
    };
  }
  try {
    const files = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName }),
    );
    if (!files.Contents) {
      return {
        success: false,
        message: "An error occurred",
      };
    }

    return {
      success: true,
      data: files.Contents?.sort(
        (a, b) =>
          new Date(b.LastModified ?? 0).getTime() -
          new Date(a.LastModified ?? 0).getTime(),
      ),
    };
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return { success: false, message: "An error occurred" };
  }
}

async function downloadFile(objectName: string, fileName: string) {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return;
  }
  try {
    const file = await s3.send(
      new GetObjectCommand({ Bucket: bucketName, Key: objectName }),
    );
    // fs.writeFileSync(fileName,  file.Body as Buffer);
    console.log(`File ${objectName} downloaded to ${fileName}`);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

type ReturnTypeDeleteObject =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

async function deleteObject({
  key,
}: {
  bucketName: string;
  key: string;
}): Promise<ReturnTypeDeleteObject> {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return { success: false, error: "Unauthorized" };
  }

  const imagesProducts = await prismadb.image.findMany({
    where: {
      url: `https://${bucketName}.s3.fr-par.scw.cloud/${key}`,
    },
    include: {
      product: true,
    },
  });

  if (imagesProducts.length > 0) {
    const productNames = imagesProducts
      .map((image) => image.product.name)
      .join(", ");
    return {
      success: false,
      error: `L'image est utilisée par le(s) produit(s) : ${productNames}`,
    };
  }

  const imagesBillboard = await prismadb.billboard.findMany({
    where: {
      imageUrl: `https://${bucketName}.s3.fr-par.scw.cloud/${key}`,
    },
  });

  if (imagesBillboard.length > 0) {
    const productNames = imagesBillboard
      .map((billboard) => billboard.label)
      .join(", ");
    return {
      success: false,
      error: `L'image est utilisée par le(s) pannneau(s) : ${productNames}`,
    };
  }

  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log(`Image supprimé`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting object: ${key}`, error);
    return { success: false, error: "Error deleting object" };
  }
}

export { deleteObject, downloadFile, getSignature, listBuckets, listFiles };

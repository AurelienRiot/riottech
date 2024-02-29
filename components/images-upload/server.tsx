"use server";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { checkAdmin } from "../auth/checkAuth";
import prismadb from "@/lib/prismadb";

const accessKeyId = process.env.SCALEWAY_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.SCALEWAY_SECRET_ACCESS_KEY as string;

const s3 = new S3Client({
  region: "fr-par",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: "https://s3.fr-par.scw.cloud",
});

async function listBuckets() {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return;
  }
  try {
    const response = await s3.send(new ListBucketsCommand({}));
    console.log("Buckets:");
    response.Buckets?.forEach((bucket) => {
      console.log(`- ${bucket.Name}`);
    });
    return response.Buckets;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

async function listFiles(bucketName: string) {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return;
  }
  try {
    const files = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );

    return files.Contents?.sort(
      (a, b) =>
        new Date(b.LastModified ?? 0).getTime() -
        new Date(a.LastModified ?? 0).getTime()
    );
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

async function uploadFile({
  bucketName,
  formData,
}: {
  bucketName: string;
  formData: FormData;
}) {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return;
  }
  try {
    const filesValues: string[] = [];
    formData.forEach(async (value, key) => {
      if (value instanceof File) {
        const uniqueName = `${uuidv4()}-${key}`;
        filesValues.push(uniqueName);

        const array = Buffer.from(await value.arrayBuffer());

        const uploadParams: PutObjectCommandInput = {
          Bucket: bucketName,
          Key: uniqueName,
          Body: array,
          ACL: "public-read",
        };

        await s3.send(new PutObjectCommand(uploadParams));
      }
    });

    return filesValues;

    // console.log(`File ${fileName} uploaded with unique name ${uniqueName}`);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

async function downloadFile(
  bucketName: string,
  objectName: string,
  fileName: string
) {
  const isAuth = await checkAdmin();
  if (!isAuth) {
    return;
  }
  try {
    const file = await s3.send(
      new GetObjectCommand({ Bucket: bucketName, Key: objectName })
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
  bucketName,
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

export { downloadFile, listBuckets, listFiles, uploadFile, deleteObject };

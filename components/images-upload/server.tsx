"use server";

import axios from "axios";
import { createHash, createHmac } from "crypto";

const accessKeyId = process.env.SCALEWAY_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.SCALEWAY_SECRET_ACCESS_KEY as string;
const bucketName = process.env.SCALEWAY_BUCKET_NAME as string;
const region = "fr-par";
const url = `${bucketName}.s3.${region}.scw.cloud/`;

const UploadServer = async (formData: FormData) => {
  const date =
    new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3) + "Z";
  const authorizationHeader = generateAuthorizationHeader({
    method: "POST",
    content: "agricoltura.jpeg",
    date,
  });
  const payloadHash = createHmac("sha256", "").update("").digest("hex");
  console.log(date);
  console.log(date.substring(0, 8));

  const method = "POST";
  const canonicalUri = "/agricoltura.jpeg";
  const canonicalQueryString = "";
  const canonicalHeaders = `content-type: multipart/form-data\nhost: ${bucketName}.s3.${region}.scw.cloud\nx-amz-content-sha256: ${payloadHash}\nx-amz-date: ${date}`;
  const signedHeaders =
    "content-type;host;x-amz-content-sha256;x-amz-date;x-auth-token;authorization;signature;content-type";
  const algorithm = "AWS4-HMAC-SHA256";
  const credentialScope = `${date.substring(0, 8)}/${region}/s3/aws4_request`;
  const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const canonicalRequestHash = createHash("sha256")
    .update(canonicalRequest)
    .digest("hex");

  const stringToSign = `${algorithm}\n${date}\n${credentialScope}\n${canonicalRequestHash}`;

  const signingKey = signature(
    signature(
      signature(
        signature(`AWS4${secretAccessKey}`, date.substring(0, 8)),
        region
      ),
      "s3"
    ),
    "aws4_request"
  );

  const signatureValue = signature(signingKey, stringToSign);

  const headers = {
    "Content-Length": formData.get("Content-Length")?.toString(),
    "Content-Type": "multipart/form-data",
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": date,
    Authorization: authorizationHeader,
  };

  axios
    .post(url, formData, { headers })
    .then((response) => {
      console.log("Object uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error uploading object:", error);
    });
};

export default UploadServer;

const signature = (key: string, message: string) =>
  createHmac("sha256", key).update(message).digest("hex");

function generateAuthorizationHeader({
  method,
  content,
  date,
}: {
  method: string;
  content: string;
  date: string;
}) {
  const canonicalRequest = `${method}\n\n\n\n\n\n\n\n\n\n\n\n${date}\n${content}`;
  const stringToSign = `AWS4-HMAC-SHA256\n${date}\n${date.substring(
    0,
    8
  )}/${region}/s3/aws4_request\n${createHash("sha256")
    .update(canonicalRequest)
    .digest("hex")}`;
  const dateKey = createHmac("sha256", `AWS4${secretAccessKey}`)
    .update(date.substring(0, 8))
    .digest();
  const dateRegionKey = createHmac("sha256", dateKey).update(region).digest();
  const dateRegionServiceKey = createHmac("sha256", dateRegionKey)
    .update("s3")
    .digest();
  const signingKey = createHmac("sha256", dateRegionServiceKey)
    .update("aws4_request")
    .digest();
  const signature = createHmac("sha256", signingKey)
    .update(stringToSign)
    .digest("hex");
  return `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${date.substring(
    0,
    8
  )}/${region}/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${signature}`;
}

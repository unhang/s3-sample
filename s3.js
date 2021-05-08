require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const { AWS_REGION,AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET } = process.env

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  signatureCache: false
});

const s3 = new AWS.S3({});

/**
 *
 * @param {*} filePath example: "./public/images/waitToUpload/abc.jpg"
 * @param {*} bucketFolder the name of the folder on S3 Bucket
 * @returns Promise request
 */
function s3uploadSingleImage(filePath, bucketFolder = "post") {
  const fileStream = fs.createReadStream(filePath);

  const KEY = `${bucketFolder}/${Date.now()}-${path.basename(fileStream.path)}`;

  const uploadParams = {
    Bucket: AWS_BUCKET,
    Body: fileStream,
    Key: KEY
  };

  return s3.upload(uploadParams).promise();
}

function getSignedUrl(objectKey) {
  const params = {
    Bucket: AWS_BUCKET,
    Key: objectKey,
    Expires: 0
  };

  return s3.getSignedUrl("getObject", params);
}

module.exports = { s3uploadSingleImage, getSignedUrl };

require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  signatureCache: false
})

s3 = new AWS.S3({});

/**
 * 
 * @param {*} filePath example: "./public/images/waitToUpload/abc.jpg"
 * @returns 
 */
function s3uploadSingleImage(filePath) {
  const fileStream = fs.createReadStream(filePath); 

  const KEY = `test-images/${Date.now()}-${path.basename(fileStream.path)}`;// change this logic to rename the key

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET,
    Body: fileStream,
    Key: KEY
  };

  return s3.upload(uploadParams).promise();
}

module.exports = { s3uploadSingleImage };

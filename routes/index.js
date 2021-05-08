const express = require("express");
const router = express.Router();
const { s3uploadSingleImage, getSignedUrl } = require("../s3");
/* GET home page. */
router.get("/", async (req, res, next) => {
  let result;
  try {
    // console.log(path)
    result = await s3uploadSingleImage('./public/images/robin.jpg');
    const {key} = result;
    signedUrl = await getSignedUrl(key)
    console.log(signedUrl)
  } catch (err) {
    console.log({ ERROR: err });
  }
  console.log(result);
  res.render("index", { title: "Express" });
});


router.get("/check-acl", (req, res,next) => {

})

router.get("/get-signed-url", async (req, res, next) => {
  try {
    signedUrl = await getSignedUrl("post/1620467339275-robin.jpg") // example key: post/1620463160383-robin.jpg
    res.json({signedUrl})
  } catch (error) {
    console.log(error)
    res.status(404).json({message: 'errorr'})
  }

})

module.exports = router;

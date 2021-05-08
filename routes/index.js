const express = require("express");
const router = express.Router();
const { s3uploadSingleImage } = require("../s3");
/* GET home page. */
router.get("/", async (req, res, next) => {
  let result;
  try {
    result = await s3uploadSingleImage("inputPath");
  } catch (err) {
    console.log({ ERROR: err });
  }
  console.log(result);
  res.render("index", { title: "Express" });
});

module.exports = router;

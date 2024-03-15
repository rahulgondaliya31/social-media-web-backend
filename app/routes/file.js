const express = require("express");
const path = require("path");
const router = express.Router();


router.get("/post/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../../upload/post/"+req.params.filename));
});

router.get("/profile_pic/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../../upload/profile_pic/"+req.params.filename));
});

router.get("/story/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../../upload/story/"+req.params.filename));
});

// router.get("/category/:filename", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../upload/category/"+req.params.filename));
// });


module.exports = router;
const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const Comment = require("../models/Comment");

/* GET home page */
router.get("/assets", (req, res, next) => {
  Asset.find()
    .populate("author")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .then(assetPayload => {
      console.log(req.user);
      res.json(assetPayload);
    });
});

router.post("/create-asset",
// uploadSingle("image"),
(req, res, next) => {
Asset.create({
  title: req.body.title,
  author: req.user._id,
  description: req.body.description,
  price: req.body.price,
  // urlPathImg: req.file.url,
  // urlPathModel: req.file.url,
  // size: req.file.size???
}).then(assetCreated =>{
  console.log(assetCreated);
  res.json(assetCreated)
} )
});

// router.post(
//   "/assets",
//   // uploadSingle('asset'),
//   // uploadSingle("image"),
//   (req, res, next) => {
//     Asset.create({
//       author: req.user._id,
//       title: req.body.title,
//       content: req.body.content,
//       urlPathImg: req.file.url
//     });
//   }
// );

module.exports = router;

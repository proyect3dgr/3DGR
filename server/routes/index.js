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
    console.log(req.user)
    res.json(assetPayload);
  });
});

module.exports = router;

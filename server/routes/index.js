const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const User = require("../models/User");
const Comment = require("../models/Comment");

/* ------------GET ENDPOINTS-------------- */
router.get("/assets", (req, res, next) => {
  Asset.find()
    .populate("author")
    .then(assetPayload => {
      res.json(assetPayload);
    });
});

router.get("/user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate("assetCollection")
    .then(userPayload => {
      res.json(userPayload);
    });
});

router.get("/product/:id", (req, res, next) => {
  Asset.findById(req.params.id)
    .populate("assetCollection")
    .populate("author")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .then(userPayload => {
      res.json(userPayload);
    });
});
/* ------------CREATE ENDPOINTS-------------- */

router.post(
  "/create-asset",
  // uploadSingle("image"),
  (req, res, next) => {
    Asset.create({
      title: req.body.title,
      author: req.user._id,
      description: req.body.description,
      price: req.body.price
      // urlPathImg: req.file.url,
      // urlPathModel: req.file.url,
      // size: req.file.size???
    }).then(assetCreated => {
      let assetID = assetCreated._id;

      User.findByIdAndUpdate(
        assetCreated.author,
        {
          $push: { assetCollection: assetID }
        },
        {
          new: true
        }
      ).then(response => {
        res.json(response);
      });
    });
  }
);

router.post("create-comment", (req, res, next) => {
  Comment.create({
    description: req.body.description
  }).then(createdComment => {
    res.json(createdComment);
  });
});

/* ------------CREATE ENDPOINTS-------------- */

router.post("/edit-asset", (req, res, next) => {
  Asset.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
    // urlPathImg: req.file.url,
  }).then(x => {
    res.json(x);
  });
});

router.post("/edit-asset-img", (req, res, next) => {
  Asset.findByIdAndUpdate(
    req.body._id,
    {
      urlPathImg: req.body.image
    },
    {
      new: true
    }
  ).then(x => {
    res.json(x);
  });
});

router.put("edit-comment", (req, res, next) => {
  Comment.findByIdAndUpdate(req.params._id, {
    description: req.body.description
  }).then(x => {
    res.json(x);
  });
});

/* ------------DELETE ENDPOINTS-------------- */

router.delete("delete-profile", (req, res, next) => {
  User.findByIdAndRemove(req.params._id).then(x => res.json(x));
});

router.delete("delete-comment", (req, res, next) => {
  Comment.findByIdAndRemove(req.params._id).then(x => res.json(x));
});

router.delete("delete-asset", (req, res, next) => {
  Asset.findByIdAndRemove(req.params._id).then(x => res.json(x));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const User = require("../models/User");
const Comment = require("../models/Comment");

/* GET home page */
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
      console.log(assetID);
      console.log(assetCreated.author);
      User.findByIdAndUpdate(
        assetCreated.author,
        {
          $push: { assetCollection: assetID }
        },
        {
          new: true
        }
      ).then(response => {
        console.log(response);
        res.json(response);
      });
    });
  }
);

router.put("edit-asset", (req, res, next) => {
  Asset.findByIdAndUpdate(req.user._id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
    // urlPathImg: req.file.url,
  }).then(x => {
    res.json(x)
  });
});

router.put("edit-profile", (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    password: req.body.password,
    // avatar: req.file.url,
    about: req.body.price,
    email: req.body.email
    // urlPathImg: req.file.url,
  }).then(x => {
    res.json(x)
  });
});

router.post("create-comment", (req, res, next) =>{
  Comment.create({
    description:req.body.description
  }).then(createdComment => {
    res.json(createdComment)
  } )
}) 

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

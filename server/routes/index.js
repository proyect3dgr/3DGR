const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const User = require("../models/User");
const Comment = require("../models/Comment");

// include CLOUDINARY:
const uploader = require("../configs/cloudinary-setup");
const uploaderModel = require("../configs/cloudinary-model");

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

router.post("/upload", uploader.single("modelImg"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.post(
  "/upload-asset",
  uploaderModel.single("modelFile"),
  (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ bytes: req.file.bytes, secure_url: req.file.secure_url });
  }
);

router.post(
  "/create-asset",
  // uploader.single("imageUrl"),
  (req, res, next) => {
    Asset.create({
      title: req.body.title,
      author: req.user._id,
      description: req.body.description,
      price: req.body.price,
      urlPathImg: req.body.image,
      urlPathModel: req.body.model,
      size: req.body.size
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

router.post("/create-comment", (req, res, next) => {
  assetID = req.body.populateAsset;
  Comment.create({
    description: req.body.description,
    author: req.user._id
  }).then(createdComment => {
    let commentID = createdComment._id;

    Asset.findByIdAndUpdate(
      assetID,
      {
        $push: { comments: commentID }
      },
      {
        new: true
      }
    ).then(response => {
      res.json(createdComment);
    });
  });
});

/* ------------EDIT ENDPOINTS-------------- */

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

// router.put("edit-comment", (req, res, next) => {
//   Comment.findByIdAndUpdate(req.params._id, {
//     description: req.body.description
//   }).then(x => {
//     res.json(x);
//   });
// });

/* ------------DELETE ENDPOINTS-------------- */

router.delete("/delete-comment", (req, res, next) => {
  Comment.findByIdAndRemove(req.body.id).then(x => res.json(x));
});

router.delete("/delete-asset", (req, res, next) => {
  Asset.findByIdAndRemove(req.body.id).then(x => res.json(x));
});

module.exports = router;

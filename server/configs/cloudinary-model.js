const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: "thing-gallery", // The name of the folder in cloudinary
  allowedFormats: ["fbx", "obx"],
  params: { resource_type: "auto" },

  filename: function(req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploaderModel = multer({ storage });
module.exports = uploaderModel;
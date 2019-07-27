const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    urlPathModel: String,
    urlPathImg: { type: String, default: "https://i.stack.imgur.com/dZSMi.jpg?s=328&g=1" },
    description: String,
    price: Number,
    size: Number,
    format: {
      type: String,
      enum: ["COLLADA", "OBJ", "FBX"],
      default: "COLLADA"
    },
    categories: {
      type: [String],
      enum: [
        "Animal",
        "Character",
        "Industrial",
        "Nature",
        "Others",
        "Robot",
        "Vehicles",
        "Weapons"
      ],
      default: ["Others"]
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;

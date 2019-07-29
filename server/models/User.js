const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/rubvaldev/image/upload/v1564245898/samples/avatardefault_px0k2s.png"
    },
    email: String,
    about: String,
    assetCollection: [{ type: Schema.Types.ObjectId, ref: "Asset" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

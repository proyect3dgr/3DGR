// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Asset = require("../models/Asset");
const Comment = require("../models/Comment");

const bcryptSalt = 10;

mongoose
  .connect(process.env.BBDD_URL, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://pickaface.net/gallery/avatar/MackennaMeadows542e92aa07839.png",
    email: "admin@admin.com",
    about: "I am your master"
  },
  {
    username: "qaqa",
    password: bcrypt.hashSync("qaqa", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://pickaface.net/gallery/avatar/unr_mrsbob_180716_0154_16ff.png",
    email: "qaqa@qaqa.com",
    about: "It is spelled QuaQua because its french for Duck"
  },
  {
    username: "BlenderTheOffender",
    password: bcrypt.hashSync("blender", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://vignette.wikia.nocookie.net/en.futurama/images/7/70/BenderTheOffender.jpg/revision/latest?cb=20110614181253",
    email: "blendertheoffender@bioware.com",
    about: "Used to work in videogames, now I am working for the CIA"
  },
  {
    username: "ZippityWob",
    password: bcrypt.hashSync("wob", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://i.ytimg.com/vi/tXb9L8LW4XI/hqdefault.jpg",
    email: "zippitywob@zappbranigan.com",
    about: "If you have one eye... send me an email"
  }
];

User.remove()
  .then(x => {
    return Comment.remove();
  })
  .then(x => {
    return Asset.remove();
  })
  .then(() => {
    return User.create(users);
  })
  .then(createdUsers => {
    userId = createdUsers[1]._id;
    userBId = createdUsers[2]._id;
    userCId = createdUsers[3]._id;
    return Comment.create([
      { description: "Very good model", author: userId },
      { description: "I think you stole this from another website, you thief", author: userCId },
      { description: "How many surreallists do you need in order to change a lightbulb? Fish", author: userBId },
      {
        description:
          `How does it feel
          To treat me like you do?
          When you've laid your hands upon me
          And told me who you are?
          Thought I was mistaken
          I thought I heard your words
          Tell me, how do I feel?
          Tell me now, how do I feel`,
        author: userId
      },
      { description: "What is a nun in a wheelchair? Virgin Mobile", author: userCId }
    ]);
  })
  .then(createdComment => {
    createdCommentPayload = createdComment;

    return Comment.create([
      {
        description: "Dad, I'm pregnant. Hello Pregnant, I am Dad",
        author: userBId
      }
    ]);
  })
  .then(createdComment2 => {
    createdCommentPayload2 = createdComment2;

    return Asset.create(
      {
        title: "Breakdancing old man",
        description:
          "Done in Blender. Part of a collection of groovy old men for the upcoming movie Geriatric Park",
        author: userCId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Breakdance_Freeze_Var_2_ojhrvn.fbx" ,
        comments: [
          createdCommentPayload[0]._id,
          createdCommentPayload[1]._id,
          createdCommentPayload[2]._id,
          createdCommentPayload[3]._id,
          createdCommentPayload[4]._id,
          createdCommentPayload[0]._id,
          createdCommentPayload[1]._id,
          createdCommentPayload[2]._id,
          createdCommentPayload[3]._id,
          createdCommentPayload[4]._id,
          createdCommentPayload[0]._id,
          createdCommentPayload[1]._id,
          createdCommentPayload[2]._id,
          createdCommentPayload[3]._id,
          createdCommentPayload[4]._id,
          createdCommentPayload[0]._id,
          createdCommentPayload[1]._id,
          createdCommentPayload[2]._id,
          createdCommentPayload[3]._id,
          createdCommentPayload[4]._id,
          createdCommentPayload2[0]._id
        ],
        price: 39,
        size: 54,
        format: "FBX",
        categories: ["Animal", "Character"]
      },
      {
        title: "Hipster robot",
        description: "Robot being so hipster and having lots of swag. Used in Cyberpunk 2077",
        author: userId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Robot_Hip_Hop_Dance_icuqu6.fbx",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Looking around",
        description: "Done in 3DMAX Studio.",
        author: userId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Look_Around_rah7xp.fbx",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Chicken dance model",
        description: "Mary Jesus and her accordion inspired me to create this masterpiece in Cinema 4d",
        author: userId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Chicken_Dance_u5du9d.fbx",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Praying standard model",
        description: "Standard model praying for this project to be successful and end world hunger at the same time",
        author: userId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Praying_otgosr.fbx",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Thriller reenacment",
        description: "Michael Jackson may be dead but Blender models are really alive, like this one and his thriller dance.",
        author: userBId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Thriller_Part_2_uyqp4n.fbx",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Hip-hop pirate",
        description: "She only has one leg, but she could move like she has three ( ͡° ͜ʖ ͡°)",
        author: userCId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564565891/Hip_Hop_Dancing_1_oi66bw.fbx",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Stand up model",
        description: "Simple model to let your NPCs stand up like it is 1972",
        author: userId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562560/Stand_Up_rtcg3u.fbx",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Dancing",
        description: "Dancing model done in Blender under 2 days of no sleep. May contain errors",
        author: userBId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564563308/Dancing_ssli83.fbx",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Victory pose",
        description: "Done in 3DMax. Perfect model and animation for a victory in a videogame",
        author: userBId,
        urlPathModel: "https://res.cloudinary.com/rubvaldev/raw/upload/v1564566199/Victory_etwjj7.fbx",
        // urlPathImg:
        //   "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      }
    );
  })
  .then(createdAsset => {
    Asset.find()
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .then(popAsset => {
        let assetId = [popAsset[0]._id, popAsset[3]._id];
        console.log(popAsset[0]._id);
        User.findByIdAndUpdate(
          popAsset[0].author,
          {
            $push: { assetCollection: assetId }
          },
          {
            new: true
          }
        ).then(givenUser => {
          console.log(givenUser);
          process.exit(0);
        });
      });
  });

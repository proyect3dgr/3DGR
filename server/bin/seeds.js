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
      "https://res.cloudinary.com/rubvaldev/image/upload/v1564482738/thing-gallery/tumblr_pnws4g87zZ1uag7foo4_r2_1280.jpg.jpg",
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
    avatar: "https://i.ytimg.com/vi/tXb9L8LW4XI/hqdefault.jpg",
    email: "zippitywob@zappbranigan.com",
    about: "If you have one eye... send me an email"
  },
  {
    username: "tali",
    password: bcrypt.hashSync("tali", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://res.cloudinary.com/rubvaldev/image/upload/v1564507295/thing-gallery/taliAvatar.png",
    email: "talizorah@flotilla.com",
    about: "Keep calm and keelah se'lai"
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
    userAId = createdUsers[1]._id;
    userBId = createdUsers[2]._id;
    userCId = createdUsers[3]._id;
    userDId = createdUsers[4]._id;
    return Comment.create([
      { description: "Very good model", author: userAId },
      {
        description: "I think you stole this from another website, you thief",
        author: userCId
      },
      {
        description:
          "How many surreallists do you need in order to change a lightbulb? Fish",
        author: userBId
      },
      {
        description: `How does it feel
          To treat me like you do?
          When you've laid your hands upon me
          And told me who you are?
          Thought I was mistaken
          I thought I heard your words
          Tell me, how do I feel?
          Tell me now, how do I feel`,
        author: userAId
      },
      {
        description: "What is a nun in a wheelchair? Virgin Mobile",
        author: userCId
      }
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
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Breakdance_Freeze_Var_2_ojhrvn.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573428/thing-gallery/photo4.png",
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
        description:
          "Robot being so hipster and having lots of swag. Used in Cyberpunk 2077",
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Robot_Hip_Hop_Dance_icuqu6.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564572677/thing-gallery/Photo2.png",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Looking around",
        description: "Done in 3DMAX Studio.",
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562508/Look_Around_rah7xp.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573226/thing-gallery/photo3.png",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "FBX",
        categories: ["Animal", "Character"]
      },
      {
        title: "T-pose",
        description:
          "Mary Jesus and her accordion inspired me to create this masterpiece in Cinema 4d",
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Chicken_Dance_u5du9d.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573428/thing-gallery/photo5.png",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Praying standard model",
        description:
          "Standard model praying for this project to be successful and end world hunger at the same time",
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Praying_otgosr.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573644/thing-gallery/photo6.png",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "FBX",
        categories: ["Animal", "Character"]
      },
      {
        title: "Thriller reenactment",
        description:
          "Michael Jackson may be dead but Blender models are really alive, like this one and his thriller dance.",
        author: userBId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562509/Thriller_Part_2_uyqp4n.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573727/thing-gallery/photo7.png",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Hip-hop pirate",
        description:
          "She only has one leg, but she could move like she has three ( ͡° ͜ʖ ͡°)",
        author: userCId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564565891/Hip_Hop_Dancing_1_oi66bw.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564573910/thing-gallery/photo8.png",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "FBX",
        categories: ["Animal", "Character"]
      },
      {
        title: "Stand up model",
        description: "Simple model to let your NPCs stand up like it is 1972",
        author: userAId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564562560/Stand_Up_rtcg3u.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564578399/thing-gallery/photo9.png",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Dancing",
        description:
          "Dancing model done in Blender under 2 days of no sleep. May contain errors",
        author: userBId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564579067/Samba_Dancing_goljtw.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564579147/thing-gallery/photo10.png",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "FBX",
        categories: ["Animal", "Character"]
      },
      {
        title: "Victory pose",
        description:
          "Done in 3DMax. Perfect model and animation for a victory in a videogame",
        author: userBId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564566199/Victory_etwjj7.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564579250/thing-gallery/photo11.png",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Clapping",
        description:
          "We hope people do this when we finish the exposition",
        author: userDId,
        urlPathModel:
          "https://res.cloudinary.com/rubvaldev/raw/upload/v1564646227/assets/Standing_Clap_1_sqvuzc.fbx",
        urlPathImg:
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564646308/thing-gallery/photo12.png",
        price: 21,
        size: 78,
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
        let assetDId = [popAsset[10]._id]
        let allAssets = [popAsset[1]._id,popAsset[2]._id,popAsset[4]._id,
        popAsset[5]._id,popAsset[6]._id,popAsset[7]._id,popAsset[8]._id,popAsset[9]._id,popAsset[10]._id]
        console.log(popAsset[0]._id);
        
        User.findByIdAndUpdate(
          userAId,

          {
            $push: { assetCollection: allAssets }
          },
          {
            new: true
          })

          // User.findByIdAndUpdate(
          //   userDId,
            
          //   {
          //     $push: { assetCollection: assetId }
          //   },
          //   {
          //     new: true
          //   })
          .then(givenUser => {
          console.log(givenUser);
          process.exit(0);
        });
      });
  });

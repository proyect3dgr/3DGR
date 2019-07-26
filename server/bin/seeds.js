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
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://pickaface.net/gallery/avatar/unr_mrsbob_180716_0154_16ff.png",
    email: "bob@bob.com",
    about: "Bobbie Bob Bobbie Bobbinci Bob Bubba Bob Bubbaloo"
  },
  {
    username: "meri",
    password: bcrypt.hashSync("meri", bcrypt.genSaltSync(bcryptSalt)),
    avatar:
      "https://pickaface.net/gallery/avatar/MackennaMeadows542e92aa07839.png",
    email: "meri@meri.com",
    about: "You can call me Meri or Meristation, but not Vandal"
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
      { description: "QUE PEDASO DE LINCE, CABESA", author: userId },
      { description: "No me lo creo", author: userCId },
      { description: "Hola Gabi", author: userBId },
      {
        description:
          "Este modelo me parece muy interesante porque lo cierto es que me recuerda cosas de mi infancia, cuando yo era una niña y me iba por ahí a buscar aceitunas con mis abuelos y veía algunos de los linces a lo lejos cazando pequeños pájaros. Es todo muy bonito.",
        author: userId
      },
      { description: "¿Quedan galletas?", author: userCId }
    ]);
  })
  .then(createdComment => {
    createdCommentPayload = createdComment;

    return Comment.create([
      {
        description: "El modelo de este lince parece que es real",
        author: userBId
      }
    ]);
  })
  .then(createdComment2 => {
    createdCommentPayload2 = createdComment2;

    return Asset.create(
      {
        title: "Modelo de un lince",
        description:
          "Este lince es tan real que da miedito intenso pero si te digo la verdad me gusta mucho que tenga esos bigotes tan largos y ese pájaro en la boca. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt. Lorem ipsum ternenum potorrum cotecorum botumrrum septetum potorrum gordum, maria cabili sui pectit, inter linteum et linteum, cabili sui aurum sunt.",
        author: userCId,
        urlPathImg:
          "https://cadenaser00.epimg.net/ser/imagenes/2019/03/09/radio_jerez/1552123616_064152_1552123853_noticia_normal.jpg",
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
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Modelo de un señor",
        description: "Un señor que señorea",
        author: userBId,
        urlPathImg:
          "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Modelo de un lince",
        description: "Este lince es tan real que da miedito intenso",
        author: userCId,
        urlPathImg:
          "https://cadenaser00.epimg.net/ser/imagenes/2019/03/09/radio_jerez/1552123616_064152_1552123853_noticia_normal.jpg",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Modelo de un señor",
        description: "Un señor que señorea",
        author: userId,
        urlPathImg:
          "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Modelo de un lince",
        description: "Este lince es tan real que da miedito intenso",
        author: userId,
        urlPathImg:
          "https://cadenaser00.epimg.net/ser/imagenes/2019/03/09/radio_jerez/1552123616_064152_1552123853_noticia_normal.jpg",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Modelo de un señor",
        description: "Un señor que señorea",
        author: userBId,
        urlPathImg:
          "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Modelo de un lince",
        description: "Este lince es tan real que da miedito intenso",
        author: userCId,
        urlPathImg:
          "https://cadenaser00.epimg.net/ser/imagenes/2019/03/09/radio_jerez/1552123616_064152_1552123853_noticia_normal.jpg",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Modelo de un señor",
        description: "Un señor que señorea",
        author: userId,
        urlPathImg:
          "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
        price: 21,
        size: 22,
        format: "FBX",
        categories: ["Character"]
      },
      {
        title: "Modelo de un lince",
        description: "Este lince es tan real que da miedito intenso",
        author: userBId,
        urlPathImg:
          "https://cadenaser00.epimg.net/ser/imagenes/2019/03/09/radio_jerez/1552123616_064152_1552123853_noticia_normal.jpg",
        comments: [createdCommentPayload[0]._id, createdCommentPayload2[0]._id],
        price: 39,
        size: 54,
        format: "OBJ",
        categories: ["Animal", "Character"]
      },
      {
        title: "Modelo de un señor para Gabi",
        description: "Un señor que señorea",
        author: userBId,
        urlPathImg:
          "https://thumbs.dreamstime.com/z/se%C3%B1or-mayor-32079845.jpg",
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

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// include CLOUDINARY:
const uploader = require("../configs/cloudinary-setup");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/checklogin", (req, res) => {
  let user = req.user;
  res.json(user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ failureDetails });
      return;
    }
    // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.
    if (!theUser) {
      res.status(500).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ failureDetails });
        return;
      }
      // We are now logged in (that's why we can also send req.user)

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password) {
    res.json({ message: "Provide username and password" });
    return;
  }

  //   if(password.length < 7){
  //     res.json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //     console.log("hola")
  //     return;
  // }

  User.findOne({ username }, "username", (err, foundUser) => {
    if (err) {
      res.json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser
      .save()
      .then(() => {})
      .catch(err => {});
  });
});

router.post("/upload", uploader.single("avatar"), (req, res, next) => {
  console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.post(
  "/edit-profile",
  // ensureLogin.ensureLoggedIn(),
  // uploader.single("avatar"),
  (req, res, next) => {
    User.findById(req.user._id).then(foundUser => {
      if (!bcrypt.compareSync(req.body.oldPass, foundUser.password)) {
        foundUser.errorMessage = "Incorrect password";

        return;
      }

      if (req.body.newPass !== req.body.newPassRepeat) {
        foundUser.errorMessage = "New password doesnt match";

        return;
      }

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(req.body.newPass, salt);

      User.findByIdAndUpdate(
        req.user._id,
        {
          password: hashPass
          // avatar: req.body.avatar
        },
        { new: true }
      ).then(updatedUser => {
        res.json(updatedUser);
      });
    });
  }
);

router.post(
  "/edit-avatar",
  // ensureLogin.ensureLoggedIn(),
  // uploadCloud.single("image"),
  (req, res, next) => {
    User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: req.body.avatar
      },
      { new: true }
    ).then(updatedUser => {
      res.json(updatedUser);
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ loggedOut: true, timestamp: new Date() });
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const Asset = require("../models/Asset");


/* GET home page */
router.get('/assets', (req, res, next) => {
  Asset.find().then(assetPayload => {
      res.json(assetPayload)
  } )
});

module.exports = router;

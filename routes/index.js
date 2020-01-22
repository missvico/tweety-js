const express = require('express');
const app = express();
const path = require("path")
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require('../tweetBank');
router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// app.use("/public", express.static(__dirname, "public"))

router.get('/stylesheets/style.css', function (req, res) {
    res.sendFile(req.path)
  });

module.exports = router

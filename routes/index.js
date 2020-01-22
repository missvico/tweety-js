const express = require('express');
const app = express();
const path = require("path")
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();

router.get('/stylesheets/style.css', function (req, res) {
    res.sendFile(req.path)
});

const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/', function (req, res) {
    res.render("index", {showForm: true})
  });

router.get('/users/:name', function (req, res) {
    var user = req.params.name.toString().split("%20").join(" ")
    let tweets = tweetBank.find({"name": user});
    res.render( 'index', { tweets: tweets } );
  });

  router.get('/tweets/:id', function (req, res) {
    var id = parseInt(req.params.id)
    let tweets = tweetBank.find({"id": id});
    res.render( 'index', { tweets: tweets } );
  });

// app.use("/public", express.static(__dirname, "public"))



module.exports = router

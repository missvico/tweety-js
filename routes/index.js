const express = require('express');
const app = express();
const path = require("path")
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
//R: es mejor si divido las rutas entre index.js, user.js y tweets.js

router.get('/stylesheets/style.css', function (req, res) {
    res.sendFile(req.path)
});

const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } ); //!!agregar el "escondedor" del form en el HTML
});


// Este iria al archivo user.js
router.get('/users/:name', function (req, res) {
    var user = req.params.name.toString().split("%20").join(" ")
    let tweets = tweetBank.find({"name": user});
    res.render( 'index', { tweets: tweets } ); //en este le agrego el tweet
  });

// Este iria al archivo tweets.js
  router.get('/tweets/:id', function (req, res) {
    var id = parseInt(req.params.id)
    let tweets = tweetBank.find({"id": id});
    res.render( 'index', { tweets: tweets } );
  });

//En tweets js sumo el post que puse en app.js
//tiene una parte de ID.

module.exports = router

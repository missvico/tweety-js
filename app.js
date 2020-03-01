const express = require("express");
const nunjucks = require("nunjucks")
const chalk = require('chalk');
const port = 8080
const routes = require("./routes")
const tweetBank = require('./tweetBank.js'); //no lo necesito aca, lo hago en el archivo de rutas
// const socketio= require("socket.io")
// const bodyParser = require("body-parser")
// const morgan = require('morgan'); //es para simplificar el middleware de Logger

/*** SETEO EL SERVER ***/

const app = express(); 
app.listen(port, () => console.log(`Listening on port ${port}!`))

/****SETEO NUNJUCKS ****/

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views', {noCache: true});

/**** MIDDLEWARE ****/

//MiddleWare Static: me devuelve los archivos estáticos en public (HTML y CSS y algunos JS)
app.use(express.static("public")) 

//Middleware parser: para poder extraer la data de los post
app.use(express.urlencoded({extended: false}))

//R: para el logger usa Morgan - ver review
function logger(req, res, next){
    console.log(chalk.red(req.method), chalk.green(req.path))
    next()
}

app.use("/", logger) 

app.use("/special", function(req, res){
    res.send("llegaste a una area especial")
})

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views', {noCache: true});

app.post("/", function(req, res){
    tweetBank.add(req.body.name, req.body.text)
    res.redirect("/")
})

// var locals = {
//     title: 'An Example',
//     people: [
//         { name: 'Harry'},
//         { name: 'Ron' },
//         { name: 'Hermione'},
//         { name: 'Hagrid'}
//     ]
// };

// app.get('/', function(req, res) {
//     res.render('index.html', locals);
// });

// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });
  

app.use("/", routes)
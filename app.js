const express = require("express");
const morgan = require('morgan');
const nunjucks = require("nunjucks")
const chalk = require('chalk');
const app = express(); 
const port = 8080

app.listen(port, () => console.log(`Listening on port ${port}!`))

// app.use(function (req, res, next){
//         console.log(chalk.red(req.method))
//         console.log(chalk.green(req.path))
//         next()
// })

// function loggerMethod(req, res, next){
//     console.log(morgan(":method :url :status"))
//     // console.log(req.path)
//     next()
// }

function logger(req, res, next){
    console.log(chalk.red(req.method), chalk.green(req.path))
    next()
}

app.use("/", logger) 

app.use("/special", function(req, res){
    res.send("llegaste a una area especial")
})

var locals = {
    title: 'An Example',
    people: [
        { name: 'Harry'},
        { name: 'Ron' },
        { name: 'Hermione'},
        { name: 'Hagrid'}
    ]
};

  
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks

nunjucks.configure('views', {noCache: true});

app.get('/', function(req, res) {
    res.render('index.html', locals);
});

// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });
  



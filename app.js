const express = require("express");
const morgan = require('morgan');
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

app.get('/', (req, res) => res.send('Hello World!'))

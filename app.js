const express = require("express");
const chalk = require('chalk');
const app = express(); 
const port = 6565

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Listening on port ${port}!`))

// app.use(function (req, res, next){
//         console.log(chalk.red(req.method))
//         console.log(chalk.green(req.path))
//         next()
// })

function loggerMethod(req, res, next){
    console.log(chalk.red(req.method))
    console.log(chalk.green(req.path))
    next()
}

app.use("/special", loggerMethod, function(req, res){
    res.send("llegaste a una area especial")
})

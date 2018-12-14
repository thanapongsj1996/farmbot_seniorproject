// npm install express ejs
var express = require('express')
var app = express()
var ejs = require('ejs')
app.engine('html', ejs.renderFile)
app.listen(8081)
app.use(express.static('public'))

app.get('/', showPlant)
function showPlant(req, res){
    res.render('plant.html')
}
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.listen(8081)
app.use(bodyParser.json());

app.post('/', showPlant)
function showPlant(req,res){
    var name = req.body.name
    res.json({name})
}
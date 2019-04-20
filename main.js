const { r } = require('./public/javascript/process')
const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const bodyParser = require('body-parser')


// DATABASE
const conn = mysql.createConnection({
    host: 'thanapong.com',
    user: 'thanapon_5g',
    password: 'Lz0g89jMC',
    database: 'thanapon_5g'
})
conn.connect()

app.use(bodyParser.json());
app.engine('html', ejs.renderFile)
app.listen(8081)

app.get('/', showPlant)
app.post('/', showTest)

app.use(express.static('public'))


// function showPlant(req, res) {
//     conn.query('select * from user', (err, result) => {
//         if (err) return res.status(403).json({ error: err.sqlMessage })
//         res.render('plant.html', { result })
//         conn.end()
//     })
// }

function showPlant(req, res) {
    res.render('plant.html')
}
function showTest(req, res) {
    var { name, city } = req.body
    res.json({ name1: name, city1: city })
}
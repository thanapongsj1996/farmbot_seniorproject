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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', ejs.renderFile)
app.listen(8081)

app.get('/', showPlant)
app.get('/q', showPlant2)
app.post('/', checkUser)
app.post('/q', showTest2)

app.use(express.static('public'))


// function showPlant(req, res) {
// conn.query('select * from user', (err, result) => {
//     if (err) return res.status(403).json({ error: err.sqlMessage })
//     res.render('plant.html', { result })
//     conn.end()
// })
// }

function showPlant(req, res) {
    res.render('plant.html')
}
function showPlant2(req, res) {
    res.render('test.html')
}
function checkUser(req, res) {
    console.log(req.body.code)
    let code = req.body.code
    conn.query(`select * from user where code = '${code}'`, (err, result) => {
        console.log(result)
        if (err) {
            return res.json(err)
        } else {
            if (result.length > 0) {
                let data = { msg: 'success' }
                console.log(JSON.stringify(data));
                res.json(data);
            }
        }
        res.json({ msg: 'ok' })
        // if (result == undefined || result.length !=0){

        // } else if (result.length == 1) {
        //     console.log('ok')
        //     let data = { msg: 'success' }
        //     console.log(data.msg)
        //     res.redirect('/?msg=success', data)
        // }
    })
    conn.end()
}
function showTest2(req, res) {
    //var { name, city } = req.body
    console.log(req.body)
    res.redirect('/')
    //res.json({ msg: 'okay' })
}
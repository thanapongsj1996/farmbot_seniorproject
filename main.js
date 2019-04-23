const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const bodyParser = require('body-parser')


// DATABASE
const conn = mysql.createConnection({
    host: 'thanapong.com',
    user: 'thanapon_5g',
    password: '',
    database: 'thanapon_5g'
})
conn.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', ejs.renderFile)
app.listen(8081)

app.get('/', showPlant)
app.get('/history', showHistory)
app.post('/checkcode', checkCode)
app.post('/', saveData)

app.use(express.static('public'))

function showPlant(req, res) {
    res.render('plant.html')
}
function showHistory(req, res) {
    res.render('history.html')
}
function saveData(req, res) {
    const { command, positions, user_id } = req.body
    _positions = positions.join(',')

    var sql = `insert into farmbot_orders (user_id, command, data) values ('${user_id}', '${command}', '${_positions}');`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                message: err
            })
        }
        res.json({ data: 'success' })
    })

}
function checkCode(req, res) {
    const { code } = req.body
    var sql = `select * from farmbot_users where code = '${code}'`
    console.log(code)
    conn.query(sql, (err, result) => {
        if (err) {
            return res.status(403).json({
                message: err
            })
        }
        if (result.length > 0) {
            res.json({
                data: {
                    status: true,
                    id: result[0].id,
                    name: result[0].name
                }
            })
        } else {
            res.json({
                data: {
                    status: false,
                    message: 'Code is incorrect.'
                }
            })
        }
    })
}
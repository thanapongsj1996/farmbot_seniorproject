const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const bodyParser = require('body-parser')


// DATABASE
// const conn = mysql.createConnection({
//     host: 'thanapong.com',
//     user: 'thanapon_5g',
//     password: '',
//     database: 'thanapon_5g'
// })
// conn.connect()
const url = 'mysql://thanapon_5g:@thanapong.com/thanapon_5g'
const conn = mysql.createPool(url)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', ejs.renderFile)
app.listen(8081)

app.get('/', showPlant)
app.get('/history', showHistory)

app.post('/', saveData)
app.post('/checkcode', checkCode)
app.post('/register', addUser)


app.use(express.static('public'))

function showPlant(req, res) {
    res.render('plant.html')
}
function showHistory(req, res) {
    var sql = `SELECT farmbot_users.name, farmbot_orders.command, farmbot_orders.positions, farmbot_orders.date from farmbot_orders JOIN farmbot_users ON farmbot_users.id = farmbot_orders.user_id order by farmbot_orders.date`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                message: err
            })
        }

        res.render('history.html', { result })
    })

}
function saveData(req, res) {
    const { command, positions, user_id } = req.body
    _positions = positions.join(',')

    var sql = `insert into farmbot_orders (user_id, command, positions) values ('${user_id}', '${command}', '${_positions}');`
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

function addUser(req, res) {
    const { name, code } = req.body
    var check_sql = `select name from farmbot_users where name = '${name}' OR code = '${code}'`
    conn.query(check_sql, (err, result) => {
        if (err) {
            return res.json({
                message: err
            })
        } else if (result.length > 0) {
            res.json({
                message: 'Name or code has been used.'
            })
        } else {
            var insert_sql = `insert into farmbot_users (name, code) values ('${name}', '${code}')`
            conn.query(insert_sql, (err, result) => {
                if(err){
                    return res.json({
                        message: err
                    })
                }
                res.json({
                    message: 'Name and code were inserted.'
                })
            })
        }
    })
}
const mysql = require('mysql');

const db = mysql.createPool({
    host : '192.168.50.88',
    user : 'maskadmin',
    password : 'Dsti123!',
    database : 'maskDB'

})

module.exports = db;
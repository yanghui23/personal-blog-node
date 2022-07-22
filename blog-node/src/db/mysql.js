
const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 1.创建数据库连接
const con = mysql.createConnection(MYSQL_CONFIG)

// 2.开始连接
con.connect()

// 3.执行sql的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}

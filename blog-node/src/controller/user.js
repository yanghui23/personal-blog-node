const {exec} = require("../db/mysql");

const verifyLogin = ({ username, password }) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `
  return exec(sql)
}

module.exports = {
  verifyLogin
}
const { verifyLogin } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = async (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const row = await verifyLogin(req.body)
    return row[0] ? new SuccessModel(row[0]) : new ErrorModel(false)
  }
}

module.exports = handleUserRouter

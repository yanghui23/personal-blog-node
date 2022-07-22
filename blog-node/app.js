
const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = async (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析query
  req.query = queryString.parse(url.split('?')[1])

  // 获取postData
  req.body = await getPostData(req)

  const blogResult = await handleBlogRouter(req, res)
  if (blogResult) {
    res.end(JSON.stringify(blogResult))
    return
  }

  const userResult = await handleUserRouter(req, res)
  if (userResult) {
    res.end(JSON.stringify(userResult))
    return
  }

  // 返回404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 not found')
  res.end()
}

module.exports = serverHandle

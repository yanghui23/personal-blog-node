const http = require('http')
const serverHandle = require('../app')
const PORT = 3000

const server = http.createServer(serverHandle)

server.listen(PORT)
console.log('listening in localhost:3000')

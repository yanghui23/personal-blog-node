
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = async (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const blogList = await getList(author, keyword)
    return new SuccessModel(blogList)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const blogData = await getDetail(id)
    return new SuccessModel(blogData)
  }

  // 创建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body
    const { insertId } = await createBlog(blogData)
    return new SuccessModel({ id: insertId })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const blogData = req.body
    const { affectedRows } = await updateBlog(id, blogData)
    return affectedRows ? new SuccessModel(true) : new ErrorModel(false)
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const { affectedRows } = await deleteBlog(id)
    return affectedRows ? new SuccessModel(true) : new ErrorModel(false)
  }
}

module.exports = handleBlogRouter

module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const User = require('../models/User')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true
  })

  router.get('/', async (req, res) => {
    const queryOptions = {}
    let items = {}
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'category'
    }
    if (req.query.hasOwnProperty('pagenum')) {
      const { pagesize, pagenum, categoryId } = req.query
      let total = 0
      if (categoryId === '') {
        items = await req.Model.find().setOptions(queryOptions).skip(pagesize * (pagenum - 1)).limit(Number(pagesize)).sort({posttime:-1})
        total = await req.Model.find().countDocuments()
      } else {
        items = await req.Model.find({ category: { _id: categoryId } }).setOptions(queryOptions).skip(pagesize * (pagenum - 1)).limit(Number(pagesize)).sort({posttime:-1})
        total = await req.Model.find({ category: { _id: categoryId } }).countDocuments()
      }
      return res.send({ items, total })
    } else {
      items = await req.Model.find()
    }
    res.send(items)
  })
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.get('/:id', async (req, res) => {
    const items = await req.Model.findById(req.params.id)
    res.send(items)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ success: true })
  })

  const authMiddleware = require('../middleware/auth')
  app.use('/api/rest/:resource', authMiddleware(), async (req, res, next) => {
    const moduleName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${moduleName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../uploads'})
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.image = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户名不存在')
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign({ id: user._id}, req.app.get('secret'))
    res.send({token})
  })
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
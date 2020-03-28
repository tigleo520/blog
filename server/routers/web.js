module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.get('/', async (req, res) => {
    const items = await req.Model.find()
    res.send(items)
  })

  app.use('/api/web/:resource', async (req, res, next) => {
    const moduleName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${moduleName}`)
    next()
  }, router)
}
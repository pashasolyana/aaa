const { verifyToken } = require('../middleware/tokenVerify')

module.exports = app => {
    const controller = require('../controller/content.controller')
    const router = require('express').Router()

    router.post('/', [verifyToken], (req,res) => {
        controller.create(req,res)
    })

    router.get('/', (req,res) => {
        controller.get(req,res)
    })

    app.use('/api/content', router)
}
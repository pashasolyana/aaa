const { verifyToken } = require('../middleware/tokenVerify')

module.exports = app => {
    const controller = require('../controller/user.controller')
    const router = require('express').Router()

    router.post('/signin', (req,res) => {
        controller.signin(req,res)
    })

    router.put('/:id', (req,res) => {
        controller.update(req,res)
    })

    router.get('/refresh-token', [verifyToken], (req,res) => {
        controller.refreshtoken(req,res)
    })

    app.use('/api/users', router)
}
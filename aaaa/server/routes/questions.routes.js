module.exports = app => {
    controller = require('../controller/questions.controller')
    const router = require('express').Router()

    router.post('/', (req,res) => {
        controller.create(req,res)
    })

    router.get('/', (req,res) => {
        controller.get(req,res)
    })

    router.get('/:id', (req,res) => {
        controller.getOne(req,res)
    })

    router.put('/:id', (req,res) => {
        controller.updateOne(req,res)
    })

    router.delete('/:id', (req,res) => {
        controller.deleteOne(req,res)
    })

    app.use('/api/questions', router)
}
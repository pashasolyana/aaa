module.exports = app => {
    const controller = require('../controller/pvz.controller')
    const router = require('express').Router()

    router.get('/', (req,res) => {
        controller.get(req,res)
    })

    router.get('/list', (req,res) => {
        controller.getAllPvz(req,res)
    })
    
    router.get('/coordinatOnly', (req,res) => {
        controller.getCoords(req,res)
    })

    router.get('/:id', (req,res) => {
        controller.getOne(req,res)
    })


    app.use('/api/pvz', router)
}
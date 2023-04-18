module.exports = app => {
    controller = require('../controller/basic.controller')
    const router = require('express').Router()
    router.post('/auth', (req,res) => {
        controller.auth(req,res)
    })
    router.post('/tariflsit', (req,res) => {
        controller.tariflsit(req,res)
    })
    router.post('/calcone', (req,res) => {
        controller.calcone(req,res)
    })
    router.post('/calculateall', (req,res) => {
        controller.calculateall(req,res)
    })
    router.post('/createdelivery', (req,res) => {
        controller.createdelivery(req,res)
    })
    router.post('/precreatedelivery', (req,res) => {
        controller.precreatedelivery(req,res)
    })
    router.post('/getlistdelivery', (req,res) => {
        controller.getlistdelivery(req,res)
    })
    router.post('/getnotscanparcel', (req,res) => {
        controller.getnotscanparcel(req,res)
    })
    router.post('/getlistdelivery_mobile', (req,res) => {
        controller.getlistdelivery_mobile(req,res)
    })
    router.post('/getdeliveryinfo', (req,res) => {
        controller.getdeliveryinfo(req,res)
    })
    router.post('/cancelparcel', (req,res) => {
        controller.cancelparcel(req,res)
    })
    router.post('/getlabel', (req,res) => {
        controller.getlabel(req,res)
    })

    router.get('/countryList', (req,res) => {
        controller.countryList(req,res)
    })
    router.get('/getrealprov', (req,res) => {
        controller.getrealprov(req,res)
    })
    router.get('/getstatusforparcelsimple/:number', (req,res) => {
        controller.getstatusforparcelsimple(req,res)
    }) 
    router.get('/city', (req,res) => {
        controller.getCities(req,res)
    })
    router.get('/findCities',(req,res) => {
        controller.findCities(req,res)
    })
    router.get('/normalAddress', (req,res) => {
        controller.getNormalAddress(req,res)
    })
    app.use('/api/base', router)
}
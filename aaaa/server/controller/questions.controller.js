const db = require('../models/index')
const Model = db.questions

module.exports = {
    create: async(req,res) => {
        try{
            const {title, firstName, phoneNumber, orderNumber, recipient} = req.body
            if(!title || !firstName || !phoneNumber || !orderNumber || !recipient){
                return res.status(400).send({message : "Bad body"})
            }
            const result = await Model.create({...req.body});
            return res.status(201).send(result)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    get : async(req,res) => {
        try{
            const result = await Model.find()
            return res.status(200).send(result)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getOne : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).send({message : "Bad id"})
            }
            const result = await Model.findOne({_id : req.params.id})
            if(!result){
                return res.status(404).send({message : "Not found"})
            }
            return res.status(200).send(result)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    updateOne : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).send({message : "Bad id"})
            }
            const result = await Model.findOneAndUpdate({_id : req.params.id}, { $set: { ...req.body }}, { new: true })
            if(!result){
                return res.status(404).send({message : "Not found"})
            }
            return res.status(200).send(result)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    deleteOne : async(req,res) => {
        try{
            const result = await Model.findByIdAndDelete(req.params.id);
            if(!result){
                return res.status(404).send({message : "Not found"})
            }
            return res.status(200).send({message : "OK"})
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    }
}
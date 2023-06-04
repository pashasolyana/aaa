const db = require('../models/index')
const User = db.users
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    signin : async(req,res) => {
        try{
            const {username, password} = req.body
            if(!username || !password){
                return res.status(400).send({message : "Wrong body"})
            }
            const user = await User.findOne({username : username});
            if(!user){
                return res.status(404).send({message : "User not found"})
            }
            if(!bcrypt.compareSync(password, user.password)){
                return res.status(400).send({message : "Wrong password"})
            }
            const token = jwt.sign({id : user._id} , process.env.SECRET, {expiresIn : "1h"})
            return res.send({
                token,
                user : {
                    id : user.id,
                }
            }).status(200)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : e})
        }
    },
    update : async(req,res) => {
        try{
        const id = req.params.id
        let updates = {}
        if(req.body.password){
            updates.password = bcrypt.hashSync(req.body.password.trim(), 8)
        }
        if(req.body.username){
            updates.username = req.body.username
        }
        const _user = await User.findByIdAndUpdate(id, updates, { new: true });
        const user = JSON.parse(JSON.stringify(_user));
        delete user.password
        return res.send(user).status(200)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : e})
        }
    },
    refreshtoken : async(req,res) => {
        try {
            const user = await User.findOne({ _id: req.userId })
            console.log(user)
            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" }) 
            return res.send({
                token,
                user : {id : user._id} 
            }).status(200)
        } catch (error) {
            console.log(error)
            return res.status(500).send({message : e})
        }
    }
}
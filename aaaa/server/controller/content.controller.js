const db = require('../models/index')
const Content = db.content

module.exports = {
    create : async(req,res) => {
        try{
        const _content = await Content.find({})
        let content
        if(_content.length == 0){
            if(!req.body.header || !req.body.body){
                return res.status(400).send({message : "Bad body"})
            }
            content = await Content.create({...req.body})
        }else{
            content = await Content.findByIdAndUpdate(_content[0]._id, req.body, { new: true });
        }
        return res.status(200).send(content)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : e})
        }
    },
    get : async(req,res) => {
        const contents = await Content.find({})
        return res.send(contents[0]).status(200)
    }
}
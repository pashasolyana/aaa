const axios = require('axios')
const qs = require('qs');
const db = require('../models/index')
const Model = db.pvz

module.exports = {
    sdekAuth: async () => {
        try {
            const data = qs.stringify({
                'grant_type': 'client_credentials',
                'client_id': 'NbNAqtgV3V2xfUty9dv0NG1lq0S5Hx0V',
                'client_secret': 'l4UKwz1K105vyaV4YBg6d8RhZDXWqw2C'
            });
            const config = {
                method: 'post',
                url: 'https://api.cdek.ru/v2/oauth/token?parameters',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            const result = await axios(config)

            if (result.status !== 200) {
                console.log('error')
            }
            return result.data
        } catch (e) {
            console.log(e)
        }
    },
    sdekGetPvz: async () => {
        try {
            const token = (await module.exports.sdekAuth()).access_token
            const config = {
                method: 'get',
                url: 'https://api.cdek.ru/v2/deliverypoints',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const result = await axios(config)

            if (result.status !== 200) {
                console.log('error')
            }

            return result.data
        } catch (e) {
            console.log(e)
        }
    },
    boxberryGetPvz: async () => {
        try {
            const config = {
                method: 'get',
                url: 'https://api.boxberry.ru/json.php?token=f5687ce49fe1886b782568bf28db8dfc&method=ListPoints&prepaid=1',
                headers: {}
            };

            const result = await axios(config)

            if (result.status !== 200) {
                console.log('error')
            }
            return result.data
        } catch (e) {
            console.log(e)
        }
    },

    get: async (req, res) => {
        // const pvz1 = await module.exports.sdekGetPvz()
        // const pvz2 = await module.exports.boxberryGetPvz()
        /*
        pvz1 - sdek
        for(let i = 0; i < pvz1.length; i++){
            let model = await Model.create({
                code: pvz1[i].code,
                name : pvz1[i].name,
                location : {
                    longitude : pvz1[i].location.longitude ,
                    latitude : pvz1[i].location.latitude ,
                    country_code : pvz1[i].location.country_code,
                    region_code : pvz1[i].location.region_code,
                    region : pvz1[i].location.region,
                    city_code: pvz1[i].location.city_code,
                    fullAddress: pvz1[i].location.address_full,
                    city: pvz1[i].location.city,
                    fiasCode : pvz1[i].location.fias_guid,
                    postal_code: pvz1[i].location.postal_code,
                    address : pvz1[i].location.address
                },
                workedTime: pvz1[i].work_time,
                type: pvz1[i].type,
                phone: pvz1[i].phones[0].number,
            })
            if(pvz1[i].office_image_list){
                for(let j = 0; j < pvz1[i].office_image_list.length;j++){
                    model.pics.push(pvz1[i].office_image_list[j].url)
                }
            }
            await model.save()
            
        }
        */
        /*
        pvz2 - boxberry

        for(let i = 0; i < pvz2.length; i++){
            let coords = pvz2[i].GPS.split(',')
            let model = await Model.create({
                code: pvz2[i].Code,
                name : pvz2[i].Name,
                location : {
                    longitude : coords[0],
                    latitude : coords[1] ,
                    country_code : null,
                    region_code : null,
                    region : pvz2[i].Area,
                    city_code:null,
                    fullAddress: pvz2[i].Address,
                    city: pvz2[i].CityName,
                    fiasCode : null,
                    postal_code: null,
                    address : pvz2[i].Address
                },
                workedTime: pvz2[i].WorkShedule,
                type: pvz2[i].TypeOfOffice,
                phone: pvz2[i].Phone,
            })
            if(pvz1[i].office_image_list){
                for(let j = 0; j < pvz1[i].office_image_list.length;j++){
                    model.pics.push(pvz1[i].office_image_list[j].url)
                }
            }
            await model.save()
        }
        */
        return res.send("OK")
    },

    getAllPvz: async (req, res) => {
        const { page = 1, limit = 10 } = req.query;

        try {
            const pvz = await Model.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Model.count();
            return res.send({
                pvz,
                totalPages: Math.ceil(Number(count) / Number(limit)),
                currentPage: Number(page)
            }).status(200);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({message : "Server error"})
        }
    },
    getOne: async(req,res) => {
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

    getCoords : async(req,res) => {
        //http://81.200.152.89/api/pvz/coordinatOnly?tileNumber=36,18,40,21&z=6&callback=id_168737337452479622042
          try{
            if(!req.query.tileNumber){
                return res.status(400).send({message : "Bad query"})
            }
            if(!req.query.callback){
                return res.status(400).send({message : "Bad query"})
            }
            let firstX;
            let firstY;
            let secondX;
            let secondY;
            let coordsArray = (req.query.tileNumber).split(',')
            firstX = coordsArray[0]
            firstY = coordsArray[1]
            secondX = coordsArray[2]
            secondY = coordsArray[3]
            console.log(firstX, firstY, secondX, secondY)
            const pounkts = await Model.find({
                $and : [
                    {"location.longitude" : {$gte : firstX}, "location.latitude" : {$gte : firstY}},
                    {"location.longitude" : {$lte : secondX}, "location.latitude" : {$lte : secondY}}
                ]
            })
            let resultArray = []
            pounkts.map(doc => {
                resultArray.push(
                    {
                        "type": "Feature",
                        "id" : doc._id,
                        "geometry": {
                          "type": "Point",
                          "coordinates": [Number(doc.location.longitude), Number(doc.location.latitude)]
                        },
                        "properties": {
                          "name": doc.name,
                          "description": 'Пункт выдачи'
                        }
                      }
                )
            })
            console.log(resultArray)
            return res.jsonp(resultArray)
          }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
          }
    }


}
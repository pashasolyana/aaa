const axios = require('axios')
const {parse} = require('csv-parse');
const fs = require('fs')

async function getIndex(address){
    try{
      let search = address.toLowerCase()
        let data = []
        fs.createReadStream("./city.csv")
        .pipe(parse({columns: true}))
        .on("data", function (row) {
         let address = (row.address).toLowerCase()
         if(address.match(search)){
           data.push({address : row.address, index : row.postal_code})
         }
      })
        .on('end', function (){
          console.log("data")
          console.log(data)
          return(data)
        })
    }catch(e){
      console.log(e)
    }
}

module.exports = {
    auth: async(req,res) => {
        try{
            const body = {
              "userName": "web_site_user",
              "password": "5f7ZJzNW7K",
              "companyCode": "LUB",
               "marketPvz": 15,
              "clientVersion": "MOBILE"
              }
            const result = await axios.post('https://api.l4y.ru/v2/api/gen/login',body)
            if(result.status !== 200){
                console.log('error')
            }
            return result.data
        }catch(e){
            console.log(e)
        }
    },
    tariflsit : async (req,res) => {
        try{
            const data = await module.exports.auth(req,res)
            console.log(data)
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/tarifflist',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : data
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : 'Server error'})
        }
    },
    calcone : async(req,res) => {
      // если указан город, брать по нему центральный индекс
      // если указан индекс, считать по нему и 
        try{
            const data = await module.exports.auth()
            if(!req.body.addservice){
              req.body.addservice = []
            }
            if(!req.body.goods){
              req.body.goods = [{"height": 1,"length": 1,"width": 1,"weight": 1}]
            }
            if(!req.body.estimatedCost){
              return res.status(400).send({message : "estimatedCost is required"})
            }
            if(!req.body.receiverAddress){
              return res.status(400).send({message : "receiverAddress is required"})
            }
            if(!req.body.senderAddress){
              return res.status(400).send({message : "receiverAddress is required"})
            }
            if(!req.body.receiverIndex){
              const receiverAddressInfo = await module.exports.getIndex(req.body.receiverAddress)
              if(receiverAddressInfo.length == 0){
                return res.status(400).send({message : "Bad address"})
              }
              req.body.receiverIndex = receiverAddressInfo[0].postal_code
            }
            if(!req.body.senderIndex){
              const senderAddressInfo = await module.exports.getIndex(req.body.senderAddress)
              if(senderAddressInfo.length == 0){
                return res.status(400).send({message : "Bad address"})
              }
              req.body.senderIndex = senderAddressInfo[0].postal_code
            }
            req.body.provID = 1,
            req.body.countryCode = "643"
            req.body.countryCode2 = "RU"
            req.body.paymenttype = 1
            req.body.dateExecute = new Date()
            req.body.tariffId = "ПОЧТА ПОСЫЛКА ОНЛАЙН"
            req.body.estimatedCost = Number(req.body.estimatedCost)
            console.log(req.body.receiverIndex)
            const FiasKladrData = await module.exports.getFias(req.body.receiverIndex)
            if(!FiasKladrData){
              return res.status(404).send({message : "Fias not found"})
            }
            if(FiasKladrData.suggestions.length == 0){
              return res.status(404).send({message : "Not found"})
            }
            req.body.receiverCityFias = FiasKladrData.suggestions[0].data.region_fias_id
            req.body.receiverCityKladr = FiasKladrData.suggestions[0].data.region_kladr_id
            var config = {
            method: 'post',
            url: 'https://api.l4y.ru/v2/api/gen/calcone',
            headers: { 
              'Authorization': `Bearer ${data.token}`, 
              'Content-Type': 'application/json'
            },
            data : req.body
          };
        const result = await axios(config)
        return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getIndex : async(address) => {
      try{
        const token = "fd97964293967b1cf8455ac41685a7f19a5beb9d";
        const secret = "98e142de70bde938918f64881a87f80ea81618c6";
        const query = address
  
        const config = {
          method: "POST",
          url : 'https://cleaner.dadata.ru/api/v1/clean/address',
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
            "X-Secret": secret
          },
        data: JSON.stringify([query])
        }
        const result = await axios(config)
        return result.data
      }catch(e){
        console.log(e)
      }
    },
    getNormalAddress : async(req,res) => {
      try{
        const token = "fd97964293967b1cf8455ac41685a7f19a5beb9d";
        const secret = "98e142de70bde938918f64881a87f80ea81618c6";
        const query = req.query.address
  
        const config = {
          method: "POST",
          url : 'https://cleaner.dadata.ru/api/v1/clean/address',
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
            "X-Secret": secret
          },
        data: JSON.stringify([query])
        }
        let data = []
        const result = await axios(config)
        for(let i = 0; i < result.data.length; i++){
          data.push(result.data[0].result)
        }
        return res.status(200).send(data)
      }catch(e){
        console.log(e)
      }
    },
    getFias : async(receiverAddress) => {
      try{
        let token = "fd97964293967b1cf8455ac41685a7f19a5beb9d"
        const options = {
          method: "post",
          url : 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": "Token " + token
          },
          data: JSON.stringify({query: receiverAddress})
      }
      const result = await axios(options)
      return result.data
      }catch(e){
        console.log(e)
      }
    },
    getrealprov : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'get',
                url: 'https://api.l4y.ru/v2/api/gen/getrealprov',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    calculateall : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/calculateall',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    countryList : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'get',
                url: 'https://api.l4y.ru/v2/api/gen/countrylist',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    createdelivery : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/createdelivery',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    precreatedelivery : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/precreatedelivery',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getlistdelivery : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/getlistdelivery',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getnotscanparcel : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/getnotscanparcel',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getlistdelivery_mobile : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/getlistdelivery_mobile',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getdeliveryinfo : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/getdeliveryinfo',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    cancelparcel : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/cancelparcel',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getlabel : async(req,res) => {
        try{
            const data = await module.exports.auth()
            var config = {
                method: 'post',
                url: 'https://api.l4y.ru/v2/api/gen/getlabel',
                headers: { 
                  'Authorization': `Bearer ${data.token}`, 
                  'Content-Type': 'application/json'
                },
                data : req.body
              };
            const result = await axios(config)
            console.log(result)
            return res.status(200).send(result.data)
        }catch(e){
            console.log(e)
            return res.status(500).send({message : "Server error"})
        }
    },
    getstatusforparcelsimple : async(req,res) => {
      try{
        const number = req.params.number
        const data = await module.exports.auth()
        var config = {
          method: 'get',
          url: `https://api.l4y.ru/v2/api/ext/getstatusforparcelsimple?Number=${number}`,
          headers: { 
            'Authorization': `Bearer ${data.token}`, 
            'Content-Type': 'application/json'
          },
          data : req.body
        };
        const result = await axios(config)
        console.log(result)
        return res.status(200).send(result.data)
      }catch(e){
        console.log(e)
        return res.status(500).send({message : "Server error"})
      }
    },
    getCities : async(req,res) => {
      try{
        let data = []
        fs.createReadStream("./city.csv")
        .pipe(parse({columns: true}))
        .on("data", function (row) {
          data.push({address : row.address, index : row.postal_code})
      })
        .on('end', function (){
          return res.status(200).send(data)
        })
      }catch(e){
        console.log(e)
        return res.status(500).send({message : "Server error"})
      }
    },
    findCities: async(req,res) => {
      try{
        if(!req.query.search){
          return res.status(400).send({message : "search is required"})
        }
        let str = (req.query.search).toLowerCase()
        let search = str.replaceAll('ё', 'е')
        let search1 = str.replaceAll('е', 'ё')
        let data = []
        fs.createReadStream("./city.csv")
        .pipe(parse({columns: true}))
        .on("data", function (row) {
         let address = (row.address).toLowerCase()
         if(address.match(search) || address.match(str) || address.match(search1)){
           data.push({address : row.address, index : row.postal_code})
         }
      })
        .on('end', function (){
          return res.status(200).send(data)
        })
      }catch(e){
        console.log(e)
        return res.status(500).send({message : "Server error"})
      }
    }
  }

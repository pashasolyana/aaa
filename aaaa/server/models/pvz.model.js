const mongoose = require('mongoose')

const PvzSchema = new mongoose.Schema({
   code : {
       type: String
   },
   name : {
       type: String
   },
   location : {
        longitude : String,
        latitude : String,
        country_code : String,
        region_code : Number,
        region : String,
        city_code: Number,
        fullAddress: String,
        city: String,
        fiasCode : String,
        postal_code: String,
        address : String
   },
   workedTime: String,
   pics: [String],
   type: String,
   phone: [String],
});

const Pvz = mongoose.model("PvzSchema", PvzSchema, "pvz");
module.exports = Pvz

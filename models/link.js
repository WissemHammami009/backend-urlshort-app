
const mongo = require('mongoose')
var db = require('../database/connectdb');
const Link = mongo.Schema({
    id:{
        type:String,
        required:true
    },
    origin_link: {
        type:String,
        required: true 
    },
    new_link: {
        type: String,
        unique:true
    },
    id_user: {
        type:String
    },
    date_add: {
        type: Date,
        default:Date.now()
    },
    number_of_clic: {
        type:Number,
        default:0
    }
})

module.exports = mongo.model('link',Link,"links")
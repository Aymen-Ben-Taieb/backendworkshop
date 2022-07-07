var mongoose=require('mongoose')
var {Schema} = require("mongoose");
var carte=require('../Models/carte')
var especes = require("../Models/especes");




var schema=mongoose.Schema

var CarteEspece=new schema({
    carte:{ type: Schema.Types.ObjectId, ref: 'carte' },
    especes:{ type: Schema.Types.ObjectId, ref: 'especes' },
})

var CarteEspece=mongoose.model('carteEspece',CarteEspece)
module.exports=CarteEspece

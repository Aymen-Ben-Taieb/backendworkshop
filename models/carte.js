var mongoose=require('mongoose')
var schema=mongoose.Schema
var especes=require('./especes')

const {Schema} = require("mongoose");


var carte=new schema({
    longitude:Number,
    latitude:Number,
    nom:String,
    description:String,


})

var Carte=mongoose.model('carte',carte)
module.exports=Carte

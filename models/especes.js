var mongoose=require('mongoose')
const {Schema} = require("mongoose");
var schema=mongoose.Schema

var espece=new schema({

    nom:String,
    description:String,
    photo:String,


})

var Espece=mongoose.model('especes',espece)
module.exports=Espece

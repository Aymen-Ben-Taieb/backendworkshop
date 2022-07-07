var mongoose = require("mongoose");
var schema = mongoose.Schema;
var conseil = new schema({
    nom: String,
    description: String,
    photo:String
})

var Conseil=mongoose.model('conseil',conseil)
module.exports=Conseil
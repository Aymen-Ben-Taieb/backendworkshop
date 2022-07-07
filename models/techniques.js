var mongoose = require("mongoose");
var schema = mongoose.Schema;
var techniques = new schema({
    nom: String,
    description: String,
    photo:String


})
var Techniques=mongoose.model('techniques',techniques)
module.exports=Techniques
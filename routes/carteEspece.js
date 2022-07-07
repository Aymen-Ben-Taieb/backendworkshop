var express = require('express');
var router = express.Router();
var Carte=require('../Models/carte')
var Espece = require("../Models/especes");
var CarteEspece = require("../Models/carteEspece");



router.post('/:carte/:especes',async (req,res)=>{

    var {carte,espece}=req.params
    var l =await Carte.findOne({nom:carte})
    var e =await Espece.findOne({nom:espece})
    var x=await CarteEspece.findOne({carte:l._id,espece:e._id})
    console.log(x)
    if (!x )
        try {
            res.json(await CarteEspece.create({carte: l._id, espece: e._id}))
        }catch(err)
        {
            res.status(400).json({ message: err.message })
        }

})
router.get('/especes/:carte', async function(req, res, next) {

    res.json(await CarteEspece.find({carte:req.params.carte}).populate("carte").populate("especes"))

});
router.get('/carte/:especes', async function(req, res, next) {

    res.json(await CarteEspece.find({especes:req.params.especes}).populate("especes").populate("carte"))

});

// router.post('/addLocalisation/:especeChasse/:localisationChasse',async (req,res)=>{
//
//     var {localisationChasse,especeChasse}=req.params
//     var l =await LocalisationChasse.findOne({nom:localisationChasse})
//     var e =await EspecesChasse.findOne({nom:especeChasse})
//     var x=await EspeceLocalisation.findOne({localisationChasse:l._id,especeChasse:e._id})
//     console.log(x)
//     if (!x )
//         try {
//             res.json(await EspeceLocalisation.create({localisationChasse: l._id, especeChasse: e._id}))
//         }catch(err)
//         {
//             res.status(400).json({ message: err.message })
//         }
//
// })





module.exports = router;

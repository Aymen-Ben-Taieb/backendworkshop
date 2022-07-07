var express = require('express');
var router = express.Router();
var Carte=require('../Models/carte')
const especes = require("../Models/especes");



// Getting all
router.get('/', async (req, res) => {
    try {
        var carte = await Carte.find()
        res.json(carte)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getCarte, (req, res) => {
    res.json(res.carte)
})

// Creating one
router.post('/', async (req, res) => {
    var carte = new Carte({
        longitude:req.body.longitude,
        latitude:req.body.latitude,
        nom:req.body.nom,
        description:req.body.description,

    })
    try {
        const newCarte = await carte.save()
        res.status(201).json(newCarte)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getCarte, async (req, res) => {
    if (req.body.longitude != null) {
        res.carte.longitude = req.body.longitude
    }
    if (req.body.latitude != null) {
        res.carte.latitude = req.body.latitude
    }
    if (req.body.nom != null) {
        res.carte.nom = req.body.nom
    }
    if (req.body.description != null) {
        res.carte.description = req.body.description
    }
    if (req.body.especes != null) {
        res.carte.especes = req.body.especes
    }
    try {
        let carte = await res.carte.save()
        res.json(carte)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getCarte, async (req, res) => {
    try {
        await res.carte.remove()
        res.json({ message: 'Deleted carte' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



async function getCarte(req, res, next) {
    let carte
    try {
        carte = await Carte.findById(req.params.id)
        if (carte == null) {
            return res.status(404).json({ message: 'Cannot find carte' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.carte = carte
    next()
}
module.exports = router;

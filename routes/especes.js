var express = require('express');
var router = express.Router();
var Especes = require("../Models/especes");



// Getting all
router.get('/', async (req, res) => {
    try {
        var especes = await Especes.find()
        res.json(especes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getEspeces, (req, res) => {
    res.json(res.especes)
})

// Creating one
router.post('/', async (req, res) => {
    var especes= new Especes({
        nom:req.body.nom,
        description:req.body.description,
        photo:req.body.photo,
        localisation:req.body.localisation,
    })
    try {
        const newEspeces = await especes.save()
        res.status(201).json(newEspeces)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getEspeces, async (req, res) => {

    if (req.body.nom != null) {
        res.especes.nom = req.body.nom
    }
    if (req.body.description != null) {
        res.especes.description = req.body.description
    }
    if (req.body.photo != null) {
        res.especes.photo = req.body.photo
    }
    if (req.body.localisation != null) {
        res.especes.localisation = req.body.localisation
    }
    try {
        let especes = await res.especes.save()
        res.json(especes)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getEspeces, async (req, res) => {
    try {
        await res.especes.remove()
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})







async function getEspeces(req, res, next) {
    let especes
    try {
        especes = await Especes.findById(req.params.id)
        if (especes == null) {
            return res.status(404).json({ message: 'no find' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.especes = especes
    next()
}
module.exports = router;

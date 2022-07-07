var express = require('express');
var router = express.Router();
var Techniques = require("../Models/techniques");



// Getting all
router.get('/', async (req, res) => {
    try {
        var techniques = await Techniques.find()
        res.json(techniques)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getTechniques, (req, res) => {
    res.json(res.techniques)
})

// Creating one
router.post('/', async (req, res) => {
    var techniques = new Techniques({
        nom:req.body.nom,
        description:req.body.description,
        photo:req.body.photo
    })
    try {
        const newTechniques = await techniques.save()
        res.status(201).json(newTechniques)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getTechniques, async (req, res) => {

    if (req.body.nom != null) {
        res.techniques.nom = req.body.nom
    }
    if (req.body.description != null) {
        res.techniques.description = req.body.description
    }
    if (req.body.photo != null) {
        res.techniques.photo = req.body.photo
    }
    try {
        let techniques = await res.techniques.save()
        res.json(techniques)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getTechniques, async (req, res) => {
    try {
        await res.techniques.remove()
        res.json({ message: 'Deleted ' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




async function getTechniques(req, res, next) {
    let techniques
    try {
        techniques = await Techniques.findById(req.params.id)
        if (techniques == null) {
            return res.status(404).json({ message: 'Cannot find ' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.techniques = techniques
    next()
}
module.exports = router;

var express = require('express');
var router = express.Router();
var Conseil = require("../Models/conseil");



// Getting all
router.get('/', async (req, res) => {
    try {
        var conseil = await Conseil.find()
        res.json(conseil)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getConseil, (req, res) => {
    res.json(res.conseil)
})

// Creating one
router.post('/', async (req, res) => {
    var conseil = new Conseil({
        nom:req.body.nom,
        description:req.body.description,
        photo:req.body.photo
    })
    try {
        const newConseil = await conseil.save()
        res.status(201).json(newConseil)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getConseil, async (req, res) => {

    if (req.body.nom != null) {
        res.conseil.title = req.body.nom
    }
    if (req.body.description != null) {
        res.conseil.description = req.body.description
    }
    if (req.body.photo != null) {
        res.conseil.photo = req.body.photo
    }
    try {
        let conseil = await res.conseil.save()
        res.json(conseil)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getConseil, async (req, res) => {
    try {
        await res.conseil.remove()
        res.json({ message: 'Deleted ' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




async function getConseil(req, res, next) {
    let conseil
    try {
        conseil = await Conseil.findById(req.params.id)
        if (conseil == null) {
            return res.status(404).json({ message: 'Cannot find ' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.conseil = conseil
    next()
}
module.exports = router;

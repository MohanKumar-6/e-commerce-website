const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');


router.get('/', async (req, res) => {
    try{
        const sliders = await Slider.find();
        res.status(200).json(sliders);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    const newSlider = new Slider(req.body);
    try {
        const savedSlider = await newSlider.save();
        res.status(201).json(savedSlider);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;
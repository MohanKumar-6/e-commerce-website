const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    link: { type: String, required: true }
})

module.exports = mongoose.model("Slider", sliderSchema);
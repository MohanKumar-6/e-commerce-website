const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    gender: {type: String, required: true, enum: ["Men", "Women", "Boys", "Girls", "Unisex"]},
    desc: { type: String, required: true, },
    details: {
      fit: {type: String, required: true},
      materialAndCare: {type: Array, required: true},
      sleeveLength: {type: String, required: true},
      collar: {type: String, required: true},
      pattern: {type: String, required: true},
      occasion: {type: String, required: true, enum: ["Casual", "Formal", "Party", "Sports", "Workwear"]},
    },
    img: { type: String, required: true },
    categories: { type: Array, required: true },
    size: { type: Array, required: true },
    color: { type: Array, required: true },
    price: { type: Number, required: true },
    inStock: {type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

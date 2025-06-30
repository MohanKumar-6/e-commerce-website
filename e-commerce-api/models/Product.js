const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },

    details: {
      // Optional crochet-specific metadata
      type: Map,
      of: String,
      default: {}
    },

    images: {
      type: [String], // multiple Cloudinary URLs
      required: true,
      validate: [arrayLimit, '{PATH} must have at least one image.']
    },
    
    thumbnail: {
      type: String, // Primary image URL
      required: true
    },

    categories: {
      type: [String],
      required: true
    },

    size: {
      type: [String],
      default: []
    },

    color: {
      type: [String],
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    inStock: {
      type: Boolean,
      default: true
    },

    handmade: {
      type: Boolean,
      default: true
    },

    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

// Custom validator to ensure at least 1 image
function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model("Product", ProductSchema);

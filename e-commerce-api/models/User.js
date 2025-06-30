const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    country: { type: String},
    phone: { type: String},
    dateOfBirth: { type: Date },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String},
    title: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Hair, Makeup, Skin, etc.
  price: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL to image
});

module.exports = mongoose.model("Service", ServiceSchema);

const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    description: { type: String, required: true }, // e.g., "Bridal Look 2026"
    image: { type: String, required: true }, // This will store the photo data
    category: { type: String, default: "Makeup" }, // Makeup, Hair, etc.
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gallery", GallerySchema);

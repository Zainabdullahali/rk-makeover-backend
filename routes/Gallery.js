const router = require("express").Router();
const Gallery = require("../models/Gallery");

// 1. UPLOAD a new photo
router.post("/", async (req, res) => {
  const newPhoto = new Gallery(req.body);
  try {
    const savedPhoto = await newPhoto.save();
    res.status(200).json(savedPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. GET all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find();
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. DELETE a photo
router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json("Photo deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

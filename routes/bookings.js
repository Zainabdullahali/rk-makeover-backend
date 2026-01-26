const router = require("express").Router();
const Booking = require("../models/Booking");

// 1. CREATE: Save a new booking
router.post("/", async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. READ: Get all bookings (for Admin Panel)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

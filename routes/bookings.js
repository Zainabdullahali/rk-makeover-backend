const router = require("express").Router();
const Booking = require("../models/Booking");
const twilio = require("twilio");

// Initialize Twilio Client (Safe Version)
const sendSMS = (to, name, date, time) => {
  if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // Ensure number has country code (India +91)
    const cleanNumber = to.length === 10 ? `+91${to}` : to;

    client.messages
      .create({
        body: `Hi ${name}! Your appointment at RK Makeover is CONFIRMED for ${date} at ${time}. See you soon! ✨`,
        from: process.env.TWILIO_PHONE,
        to: cleanNumber,
      })
      .then((message) => console.log("SMS Sent: " + message.sid))
      .catch((err) => console.error("Failed to send SMS:", err));
  } else {
    console.log("Twilio credentials missing. SMS skipped.");
  }
};

// 1. CREATE
router.post("/", async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. READ
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. UPDATE (The Magic Happens Here 🪄)
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    // 👇 CHECK: If status is now "Confirmed", Send SMS!
    if (req.body.status === "Confirmed") {
      sendSMS(
        updatedBooking.phone,
        updatedBooking.name,
        updatedBooking.date,
        updatedBooking.time,
      );
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

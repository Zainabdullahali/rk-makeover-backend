const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 👇 IMPORT ROUTES
const bookingRoute = require("./routes/bookings");
const serviceRoute = require("./routes/services");
const galleryRoute = require("./routes/Gallery");
const productRoute = require("./routes/products"); // <--- NEW LINE 1 (Import)

dotenv.config();

// 👇 CONNECT TO DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// 👇 MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// 👇 USE ROUTES
app.use("/api/bookings", bookingRoute);
app.use("/api/services", serviceRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/products", productRoute); // <--- NEW LINE 2 (Use)

// 👇 START SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

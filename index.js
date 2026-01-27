const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 👇 IMPORT ROUTES
const bookingRoute = require("./routes/bookings");
const serviceRoute = require("./routes/services"); // <--- NEW LINE ADDED ✅

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

// 👇 USE ROUTES
app.use("/api/bookings", bookingRoute);
app.use("/api/services", serviceRoute); // <--- NEW LINE ADDED ✅

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

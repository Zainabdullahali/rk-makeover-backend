const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bookingRoute = require("./routes/bookings"); // <--- Import Route

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoute); // <--- Use Route

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

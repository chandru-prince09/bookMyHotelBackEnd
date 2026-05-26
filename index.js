const express = require("express");
const hotelrouter = require("./routers/hotelrouter");
const app = express();
app.use(express.json());
app.use("/api/v1/hotels", hotelrouter);
module.exports = app;
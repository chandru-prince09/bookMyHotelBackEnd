const express = require("express");
const hotelrouter = require("./routers/hotelrouter");
const app = express();
app.use(express.json());
app.use("/api/v1/hotels", hotelrouter);
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: ` the url ${req.originalUrl} not found`
    })
})
module.exports = app;
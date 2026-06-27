const express = require("express");
const hotelrouter = require("./routers/hotelrouter");
const app = express();
app.use(express.json());
app.use("/api/v1/hotels", hotelrouter);
app.use("/api/v1/users",user);
//global error handling middleware
app.use((error,req,res,next)=>{
    res.status(error.status.code||500).json({
        status:error.status||"error",
        message:error.message
    })
    next()
})
//default handler for the routes which are not defined
app.all("*splat", (req, res,next) => {
    res.status(404).json({
        status: "fail",
        message: ` the url ${req.originalUrl} not found`
    })
    
})
module.exports = app;



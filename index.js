const express = require("express");
const hotelRouter = require("./routers/hotelrouter");
const authRouter = require("./routers/authrouter");
const userRouter = require("./routers/userrouter");
const app = express();
app.use(express.json());
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
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



const express = require('express');
const hotelControl = require('../controllers/hotelcontroller');
const hotelrouter = express.Router();


// alias with hyphen to match requests like '/get-featured' from Postman
hotelrouter.route("/get-featured")
    .get(hotelControl.getFeaturedHotels, hotelControl.getAllHotels)
hotelrouter.route("/")
    .get(hotelControl.getAllHotels)
    .post(hotelControl.createHotel)
hotelrouter.route("/:id")
    .get(hotelControl.getHotelById)
    .patch(hotelControl.updateHotel)
    .delete(hotelControl.deleteHotel)
    .put(hotelControl.updateHotel)



module.exports = hotelrouter;
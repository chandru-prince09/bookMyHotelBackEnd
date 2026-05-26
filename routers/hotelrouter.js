const express = require('express');
const hotelControl = require('../controllers/hotelcontroller');
const hotel = require('../models/hotels');
const hotelrouter = express.Router();


hotelrouter.route("/")
    .get(hotelControl.getAllHotels)
    .post(hotelControl.createHotel)
hotelrouter.route("/:id")
    .get(hotelControl.getHotelById)
    .patch(hotelControl.updateHotel)
    .delete(hotelControl.deleteHotel)
    .put(hotelControl.updateHotel)



module.exports = hotelrouter;
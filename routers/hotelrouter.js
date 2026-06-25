const express = require('express');
const hotelControl = require('../controllers/hotelcontroller');
const hotelrouter = express.Router();


hotelrouter.route("/get-featured")
    .get(hotelControl.getFeaturedHotels)

hotelrouter.route("/get-stats")
    .get(hotelControl.getHotelStats)

hotelrouter.route("/getHotelByCategory")
    .get(hotelControl.getHotelByCategory)

hotelrouter.route("/getHotelByCity")
    .get(hotelControl.getHotelsByCity)

hotelrouter.route("/getHotelByType")
    .get(hotelControl.getHotelsByType)

hotelrouter.route("/")
    .get(hotelControl.getAllHotels)
    .post(hotelControl.createHotel)
hotelrouter.route("/:id")
    .get(hotelControl.getHotelById)
    .patch(hotelControl.updateHotel)
    .delete(hotelControl.deleteHotel)
    .put(hotelControl.updateHotel)






module.exports = hotelrouter;
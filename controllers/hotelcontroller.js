const hotel = require("../models/hotels");

exports.getAllHotels = async (req, res) => {
    try {
        const query = req.query;
        
        // const hotels = await hotel.find({city: req.params.city })
        const hotels = await hotel.find()
            // .where('pricePerNight')
            // .gte(req.query.minPrice)
            // .lte(req.query.maxPrice)
            // .where('rating')
            // .gte(req.query.minRating)
            // .lte(req.query.maxRating)
            ;
        res.status(200).json({
            count: hotels.length,
            status: "success",
            data: hotels
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.createHotel = async (req, res) => {
    try {
        const newHotel = await hotel.create(req.body);
        res.status(201).json({
            status: "success",
            data: newHotel
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getHotelById = async (req, res) => {
    try {
        const hotelData = await hotel.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: hotelData
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.updateHotel = async (req, res) => {
    try {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: "success",
            data: updatedHotel
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.deleteHotel = async (req, res) => {
    try {
        await hotel.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

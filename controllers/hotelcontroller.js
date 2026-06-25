const Hotel = require('./../models/hotels');
const apiFeatures = require('./../utilities/features');

exports.getFeaturedHotels = (req, res, next) => {
    // req.query.params.feature='true';
    // req.query.params.sort='-ratings';
    // req.query.params.limit=5

    Object.defineProperty(req, 'query', {    //defineProperty is used to define a new property directly on an object, 
        // or modify an existing property on an object, and return the object.
        value: {
            ...req.query,
            feature: 'true',
            sort: '-ratings',
            limit: 5
        }
    })
    next();
}

exports.getAllHotels = async (req, res) => {
    const features = new apiFeatures(Hotel.find(), req.query)
    try {

        const query = features
            .filter()
            .sort().
            fieldLimit()
            .pagination()
            .queryObj;


        const hotels = await query;
        res.status(200).json({
            status: 'success',
            count: hotels.length,
            data: hotels
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: "error found"
        });
    }
};
exports.createHotel = async (req, res) => {
    try {
        const newHotel = await Hotel.create(req.body);
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
        const id = req.params.id;
        const hotelData = await Hotel.findById(id);
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
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({
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



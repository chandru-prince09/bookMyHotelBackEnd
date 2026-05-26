const Hotel = require("../models/hotels");

exports.getAllHotels = async (req, res) => {
    try {
        console.log(req.query)

        const queryObj = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']

        excludedFields.forEach((ele) => {
            delete queryObj[ele]
        })
        const filteredQuery = getFilteredFinalQuery(queryObj);
        console.log(filteredQuery)
        const hotels = await Hotel.find(filteredQuery);
        res.status(200).json({
            status: 'success',
            count: hotels.length,
            data: [
                hotels
            ]
        })
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to load the data'
        })
    }
}
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
        const hotelData = await Hotel.findById(req.params.id);
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
const getFilteredFinalQuery = (queryObj) => {
    const filterQuery = {};
    // { city: 'Chennai', 'ratings[gte]': '4', 'cheapestPrice[lt]': '3000' } QueryObject
    // { city: 'Chennai', ratings: { $gte: 4 }, cheapestPrice: { $lt: 3000 } }  Wants to convert like this 

    for (const key in queryObj) {
        const value = queryObj[key];
        const match = key.match(/^(.*)\[(gte|gt|lte|lt)\]$/);
        console.log(match)
        if (match) {
            const fieldName = match[1] //ratings
            const operator = `$${match[2]}` //$gte
            if (!filterQuery[fieldName]) {
                filterQuery[fieldName] = {};
                filterQuery[fieldName][operator] = value
            }
        } else {
            filterQuery[key] = value
        }



    }


    console.log(filterQuery)

    return filterQuery
}
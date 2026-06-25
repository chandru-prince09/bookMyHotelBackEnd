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
        console.error("getAllHotels error:", err);
        res.status(500).json({
            status: 'fail',
            message: err.message || "error found"
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

exports.getHotelStats = async (req, res) => {
    try {
        const hotelstats = await Hotel.aggregate([
            { $match: { type: "hotel" } },
            {
                $group: {
                    _id: "$city",
                    avgRating: { $avg: "$ratings" },
                    minPrice: { $min: "$cheapestPrice" },
                    maxPrice: { $max: "$cheapestPrice" },
                    totalHotels: { $sum: "$cheapestPrice" }
                }
            },
            { $sort: { minPrice: -1 } },
            { $limit: 3 },



            { $addFields: { city: "$_id" } },
            { $project: { _id: 0, } },


        ]);
        res.status(200).json({
            status: "success",
            count: hotelstats.length,
            data: hotelstats
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getHotelByCategory = async (req, res) => {
    try {
        const hotelCategoryStats = await Hotel.aggregate([
            { $unwind: "$category" },
            {
                $group: {
                    _id: "$category",
                    hotels: { $push: "$name" },
                    count: { $sum: 1 }
                }
            }
        ]);



        res.status(200).json({
            status: "success",
            count: hotelCategoryStats.length,
            data: hotelCategoryStats
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getFeaturedHotels = async (req, res) => {
    try {
        const featuredHotels = await Hotel.aggregate([
            { $match: { feature: true } },
            { $sort: { ratings: -1 } },
            { $limit: 5 }
        ]);
        res.status(200).json({
            status: "success",
            count: featuredHotels.length,
            data: featuredHotels
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}  

exports.getHotelsByCity = async (req, res) => {
    try {
        
        const hotelsByCity = await Hotel.aggregate([
            {
                $group: {
                    _id: "$city",
                    hotels: { $push: "$$ROOT" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({
            status: "success",
            count: hotelsByCity.length,
            data: hotelsByCity
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getHotelsByType = async (req, res) => {
    try {
        
        const hotelsByType = await Hotel.aggregate([
            {
                $group: {
                    _id: "$type",
                     totalHotels: { $sum: 1 },
                     minPrice: { $min: "$cheapestPrice" },
                }},
            { $sort: { totalHotels: -1 } },
            { $limit: 5 },
            { $addFields: { type: "$_id" } },
            { $project: { _id: 0, } },
        ]);
        res.status(200).json({
            status: "success",
            count: hotelsByType.length,
            data: hotelsByType
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}
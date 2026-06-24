const Hotel = require("../models/hotels");

exports.getAllHotels = async (req, res) => {
    try {
        console.log(req.query);

        const queryObj = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']

        excludedFields.forEach((ele) => {
            delete queryObj[ele]
        })
        const filteredQuery = getFilteredFinalQuery(queryObj);
        console.log(filteredQuery)
        let query = Hotel.find(filteredQuery);
       
        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-cheapestPrice')
        }
        //  
        // if(req.query.sort){
            // const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(sortBy)  
        // }else{
            // query = query.sort('-cheapestPrice')
        // }

        // if(req.query.sort){
            // const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(sortBy)
        // }else{
            // query = query.sort('-cheapestPrice')
        // }
        // if(req.query.sort){
            // const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(sortBy)
        // }
        // if(req.query.sort){
            // const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(sortBy)
        // }else{
            // query = query.sort("-cheapestPrice")
       // }
    //    if(req.query.sort){
        // const sortBy = req.query.sort.split(',').join(' ')
        // query = query.sort(sortBy)
    //    }else{
        // query = query.sort("-cheapestPrice")
      // }
    //   if(req.query.sort){
        // const sortBy = req.query.sort.split(',').join(' ')
        // query = query.sort(sortBy)
    //   }else{
        // query = query.sort("-cheapestPrice")
    //   }

    // if(req.query.sort){
        // const sortBy = req.query.sort.split(',').join('  ')
        // query = query.sort(sortBy)
    // }else{
        // query = query.sort(' ')
    // }

        


        //projecting fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select("-__v")
        }

        // if(req.query.fields){
            // const fields = req.query.fields.splits(',').join(' ')
            // query = query.select(fields)

        // }else{
            // query = query.select("-__v")
        // }
        // if(req.query .fields){
            // const fields = req.query.fields.split(',').join(' ')
            // query = query.select(fields)
        // }else{
            // query = query.select("-___v")
        //}
        // if(req.query.fields){
            // const fields = req.query.fields.split(',').join(' ')
            // query = query.select(fields)
        // }else{
            // query = query.select("-___v")
        // }
        // if(req.query.fields){
            // const fields = req.query.fields.split(',').join(' ')
            // query = query.select(fields)
        // }else{
            // query = query.select("-___v")
        // }
        // if(req.query.fields){
            // const fields = req.query.fields.split(',').join(' ')
            // query = query.select(fields)
        // }else{
            // query = query.select("-___v")
        // }



        //implement pagenation
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        //page 1 = skip = 0 limit = 10   
        //page 2 = skip = 10 limit = 10
        //page 3 = skip = 20 limit = 10
        const skip = (page - 1) * limit;    
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const totalHotels = await Hotel.countDocuments();
            if(skip >=totalHotels){
                throw new Error("page not found")
            }
            
        }


        


        const hotels = await query;
        res.status(200).json({
            status: 'success',
            count: hotels.length,
            data: hotels
        })
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to load the data'
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
        let value = queryObj[key];
        
        // Convert numeric string to actual number if applicable
        if (typeof value === 'string' && !isNaN(value) && value.trim() !== '') {
            value = Number(value);
        }

        const match = key.match(/^(.*)\[(gte|gt|lte|lt)\]$/);
        console.log(match)
        if (match) {
            const fieldName = match[1]; // ratings
            const operator = `$${match[2]}`; // $gte
            if (!filterQuery[fieldName] || typeof filterQuery[fieldName] !== 'object') {
                filterQuery[fieldName] = {};
            }
            filterQuery[fieldName][operator] = value;
        } else {
            filterQuery[key] = value;
        }
    }

    console.log(filterQuery);

    return filterQuery;
}
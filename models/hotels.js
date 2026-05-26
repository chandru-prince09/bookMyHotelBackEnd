const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: [true, "id must be unique"],
        required: [true, "id is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    pricePerNight: {
        type: Number,
        required: [true, "price is required"]
    },
    rating: {
        type: Number,
        required: [true, "rating is required"]
    }
})
const hotel = mongoose.model("hotel", hotelSchema);
module.exports = hotel;
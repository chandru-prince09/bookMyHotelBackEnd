const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: [true, "id must be unique"],
            required: [true, "id is required"],
        },
        name: {
            type: String,
            required: [true, "name is required"],
        },
        type: {
            type: String,
        },
        address: {
            type: String,
        },
        distance: {
            type: Number,
        },
        feature: {
            type: Boolean,
        },
        category: {
            type: [String],
        },
        images: {
            type: [String],
        },
        rooms: {
            type: [String],
        },
        cheapestPrice: {
            type: Number,
        },
        pricePerNight: {
            type: Number,
        },
        description: {
            type: String,
        },
        ratings: {
            type: Number,
        },
        city: {
            type: String,
            required: [true, "ciy is required"],
        },
        country: {
            type: String,
        },
    },
    {
        toJSON: { virtuals: true }
        
    }
);

hotelSchema.virtual("isPremium").get(function () {
    return this.cheapestPrice >= 2000;
});

const hotel = mongoose.model("hotel", hotelSchema);

module.exports = hotel;
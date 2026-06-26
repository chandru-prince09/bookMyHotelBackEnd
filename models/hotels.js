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
            min:0,
            max:5,
            // validate:{
            //     validator:function(value){
            //         return value>=0&&value<=5
            //     },
            //     message:"ratings must be between 1 and 10"
            // }

        },
        city: {
            type: String,
            required: [true, "ciy is required"],
            minLength:3,
            maxLength:60,

        },
        country: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        createdBy: {
            type: String,
            default: "kavya",
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

hotelSchema.virtual("isPremium").get(function () {
    return this.cheapestPrice >= 2000;
});

hotelSchema.pre("save", function (next) {
     this.createdAt = new Date();
     this.createdBy = "Theramaiyanavanga"
     
});
hotelSchema.pre("find",function(){
    console.log(this)
})

hotelSchema.post("find",function(docs){
    console.log(`${docs.length}hotel retrived`)
})
hotelSchema.pre("aggregate",function(){
    this.pipeline().unshift({
        $match:{isDeleted:false}
    })
})

const hotel = mongoose.model("hotel", hotelSchema);


module.exports = hotel;

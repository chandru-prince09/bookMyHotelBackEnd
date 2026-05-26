const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const Hotel = require('./../models/hotels')
//connect the database 


const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectionString = "mongodb+srv://admin:chandru123@madras.oa5w6ni.mongodb.net/bookmyhotel?appName=madras";
mongoose.connect(connectionString)
    .then((conn) => {
        console.log("script database is connected")
    })
    .catch((err) => {
        console.log("database is not conected ")
    })

//Read the file (only used during --import)

//Delete all the documents from the collection

const deleteDocuments = async () => {
    try {
        await Hotel.deleteMany({})
        console.log("Collection Data Deleted successfully")
    } catch (error) {
        console.log("Deleted fail")
    }
}


//Import all the data into collection

const importDocumenst = async () => {
    try {
        const hotels = JSON.parse(fs.readFileSync('./data/hotels.json', 'utf-8'))
        await Hotel.create(hotels)

        console.log("Imported Data successfully")


    } catch (error) {
        console.log("Imported Data fail")

    }
    process.exit();
}


if (process.argv[2] == "--delete") {
    deleteDocuments();

}

if (process.argv[2] == "--import") {
    importDocumenst();
}

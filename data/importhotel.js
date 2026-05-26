const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Hotel = require('./../models/hotels');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectionString = "mongodb+srv://admin:chandru123@madras.oa5w6ni.mongodb.net/bookmyhotel?appName=madras";

const deleteDocuments = async () => {
    try {
        await Hotel.deleteMany({});
        console.log("Collection Data Deleted successfully");
    } catch (error) {
        console.log("Deleted fail", error);
    }
};

const importDocuments = async () => {
    try {
        const hotels = JSON.parse(fs.readFileSync(path.join(__dirname, 'hotels.json'), 'utf-8'));
        const hotelsWithId = hotels.map((hotel, index) => ({
            id: index + 1,
            ...hotel
        }));
        await Hotel.create(hotelsWithId);
        console.log("Imported Data successfully");
    } catch (error) {
        console.log("Imported Data fail")

    }
    process.exit();
}


if (process.argv[2] == "--delete") {
    deleteDocuments();

}

if (process.argv[2] == "--import") {
    importDocuments();
}

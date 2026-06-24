const fs = require('fs');
const path = require('path');
const Hotel = require('./../models/hotels');
const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '8.8.4.4']);



// const deleteDocuments = async () => {
// try {
// await Hotel.deleteMany({});
// console.log("Collection Data Deleted successfully");
// } catch (error) {
// console.log("Deleted fail", error);
// }
// };

const deleteDocuments = async () => {
    try {
        await Hotel.deleteMany({});
        console.log("collection data deleted successfully");
        process.exit();
    } catch (error) {
        console.log("Failed to delete collection data", error);
        process.exit(1);
    }
}
// const importDocuments = async () => {
// try {
// const hotels = JSON.parse(fs.readFileSync('hotels.json'), 'utf-8'));
// const hotelsWithId = hotels.map((hotel, index) => ({
// id: index + 1,
// ...hotel
// }));
// await Hotel.create(hotelsWithId);
// console.log("Imported Data successfully");
// } catch (error) {
// console.log("Imported Data fail")
// 
// }
// process.exit();
// }
// 

const importDocuments = async () => {
    try {
        const hotelsPath = path.join(__dirname, 'hotels.json');
        const hotels = JSON.parse(fs.readFileSync(hotelsPath, 'utf-8'));
        const hotelsWithId = hotels.map((hotel, index) => ({
            id: index + 1,
            ...hotel
        }));
        await Hotel.create(hotelsWithId);
        console.log("Imported Data successfully");
        process.exit();
    } catch (error) {
        console.log("Imported Data fail", error);
        process.exit(1);
    }
}

const connectionString = "mongodb+srv://admin:chandru123@madras.oa5w6ni.mongodb.net/bookmyhotel?appName=madras";

const run = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection failed', error);
        process.exit(1);
    }

    if (process.argv[2] === '--delete') {
        await deleteDocuments();
    }

    if (process.argv[2] === '--import') {
        await importDocuments();
    }
}

run();

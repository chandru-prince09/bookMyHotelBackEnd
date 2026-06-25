const dns = require("dns");
const mongoose = require("mongoose");
const app = require("./index");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config({
     path: "./config.env" 
    });
// console.log(app.get('env'))
console.log(process.env);

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
    .then(() => {
        console.log("connected to database");
    })
    .catch((error) => {
        console.log("error connecting to database");
    })
app.listen(port, "localhost", () => {
    console.log("server started at", port);
});
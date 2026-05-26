const dns = require("dns");
const mongoose = require("mongoose");
const app = require("./index");
const port = 4500;

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectionString = "mongodb+srv://admin:chandru123@madras.oa5w6ni.mongodb.net/bookmyhotel?appName=madras";

mongoose.connect(connectionString)
    .then(() => {
        console.log("connected to database");
    })
    .catch((error) => {
        console.log("error connecting to database");
    })
app.listen(port, "localhost", () => {
    console.log("server started");
});
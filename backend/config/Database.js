const mongoose = require('mongoose');

require("dotenv").config();


const dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL).
    then(() => {
        console.log("Database connection successfull");
    }).  
    catch((error) => {
        console.log("Unable to connect to Database");
        console.warn(error.message);
        process.exit(1);
    });
}

module.exports = dbConnection;
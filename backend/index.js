const express = require('express');
const app = express();


require("dotenv").config();


const cors = require('cors');
app.use(cors());


// ADD MIDDLEWARE AS A BODY PARSER >>>
app.use(express.json());


// IMPORTING ROUTER >>>
const StudentRoutes = require("./routes/StudentRoutes");

// ADDING MIDDLEWARE >>>>
app.use("/api/v1", StudentRoutes);


// LETS CONNECT TO THE DATABASE >>>
const dbConnection =  require("./config/Database");
dbConnection();


const PORT = process.env.PORT || 4000 || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


// lets create a default route >>>
app.get('/', (req, res) => {
    res.send('<h3>Hello Duniyaa</h3>');
});
"use strict"

const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.
const app = express(); 
const port = process.env.PORT || 3000; //Port
const mongoose = require("mongoose"); //Mongoose

const authRoutes = require("./routes/authRoutes"); //authRoutes



app.use(cors()); 
app.use(express.json()); 


require("dotenv").config();



app.use("/api", authRoutes);



//startar
app.listen(port, () => {
    console.log("Server started on: " + port)
});
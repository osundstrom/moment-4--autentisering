"use strict"

const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.
const app = express(); 
const port = process.env.PORT || 3000; //Port
const mongoose = require("mongoose"); //Mongoose
const jwt = require("jsonwebtoken");//jwt

const authRoutes = require("./routes/authRoutes"); //authRoutes



app.use(cors()); 
app.use(express.json()); 


require("dotenv").config();



app.use("/api", authRoutes);

//skyddad
app.get("/api/secret", validateToken, (request, response) => {
    response.json({message: "skyddad"});
    console.log("skyddad");
})

//Funtkion för token
function validateToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        response.status(401).json({message: "Bad authorization, no token"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
        if (error) {
            return response.status(403).json({message: "bad JWT"});
        }

        request.username = username
        next();
    })
};


//startar
app.listen(port, () => {
    console.log("Server started on: " + port)
});
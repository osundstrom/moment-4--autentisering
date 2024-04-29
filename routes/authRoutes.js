"use strict"

const express = require("express"); //Express
const router = express.Router();
const mongoose = require("mongoose"); //Mongoose
require("dotenv").config(); //.env

const User = require("./models/User"); //User från models/User



//ansluta dastabas
mongoose.set("strictQuery", false);

mongoose.connect(process.env.URL).then(() => {
    console.log("connected to databse");
}).catch ((error) => {
    console.error("error when connecting to database, " + error)
})




//skapa användare
router.post("/register", async (request, response) => {
    try {
        const {username, password, email, account_created} = request.body;

        //Validering
        if (username.length < 6 || username.length > 20) {
            return response.status(400).json({error: "Username has to be 7-20 characters"})
        }

        if (password.length < 8 ) {
            return response.status(400).json({error: "Password has to be atleast 8 characters"})
        }

        
        //Spara
        const user = new User({username, password, email});
        await user.save();
        response.status(201).json({message: "User created"})

    } catch (error) {
        response.status(500).json({error})
    }
});


router.post("/login", async (request, response) => {
    try {
        const {username, password} = request.body;

        //Validering input
        if (username.length < 6 || username.length > 20) { //Längd användarnamn
            return response.status(400).json({error: "Username has to be 7-20 characters"})
        }

        if (password.length < 8 ) { //Längd lösenord
            return response.status(400).json({error: "Password has to be atleast 8 characters"})
        }

        //Validering inlogg

        //Användare
        const user = await User.findOne({username});
        if(!user) {
            return response.status(401).json({error: "Invalid Username"})
        }

        //Lösenord
        const matchPassword = await user.comparePassword(password);
        if (!matchPassword) {
            return response.status(401).json({error: "Invalid Password"})
        }

        else{
            response.status(200).json({Message: "Logged in"})
        }



    } catch (error) {
        response.status(500).json({error: error.message })
        console.log("here")
    }
});


//router
module.exports = router;

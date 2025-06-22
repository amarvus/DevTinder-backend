const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Manish",
        lastName: "Phan",
        emailId: "manish@gmail.com",
        password: "hero",
    });

    try {
        await user.save();
        res.send("User added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});



connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(1234, () => {
        console.log("Server is successfully listening on port 1234...");
    
        });
    })
    .catch((err) => {
        console.error("Database cannot connect!!");
    });


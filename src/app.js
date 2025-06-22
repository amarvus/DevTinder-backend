const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

    console.log(req.body);
    
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.get("/user", async (req, res) => {
    try {
        const user = await User.find({emailId: req.body.emailId});
        if (user.length === 0) {
            res.status(404).send("No user found.")
        } else {
            res.send(user);
        }
        
    } catch (err) {
        res.status(400).send("Somenthing went wrong!")
    }
    
});

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (err) {
        res.status(400).send("Somenthing went wrong!")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        res.send(deleteUser);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, data);
        res.send(updatedUser);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
})

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(1234, () => {
        console.log("Server is successfully listening on port 1234...");
    
        });
    })
    .catch((err) => {
        console.error("Unable to connect...");
    });


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
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => {
            ALLOWED_UPDATES.includes(k);
        });
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        const updatedUser = await User.findByIdAndUpdate(userId, data, {runValidators: true});
        res.send("User data updated successfully");
    } catch (err) {
        res.status(400).send("Update failed: " + err.message);
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
        console.error("Unable to connect with database...");
    });


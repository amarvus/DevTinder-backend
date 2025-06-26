const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const {validateSignupData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookiParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookiParser());
app.use(express.json());


app.post("/signup", async (req, res) => {
    
    try {
        // validate signup data
        validateSignupData(req);

        const {firstName, lastName, emailId, password} = req.body;

        // encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        });
        await user.save();
        res.send("User added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (ispasswordValid) {
            // create a JWT token
            const token = jwt.sign({_id: user._id}, "DEV@Tinder$123");
            //console.log(token);

            // add the token to cookie and send the response back to the user
            res.cookie("token", token);

            res.send("Login Successful");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
})

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

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const {token} = cookies;

        if (!token) {
            throw new Error("Invalid token");
        }

        const decodedMessage = jwt.verify(token, "DEV@Tinder$123"); // gives user _id

        const {_id} = decodedMessage;
        console.log("UserID: " + _id);

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        console.log("Name: " + user.firstName + " " + user.lastName);

        //console.log(cookies);
        res.send("reading cookies");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

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


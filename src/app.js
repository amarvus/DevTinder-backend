const express = require("express");
const {adminAuth, userAuth} = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
    res.send("User data sent.");
});

app.get("/user/login", (req, res) => {
    res.send("User logged in successfully!");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent.");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted the user.");
});

app.listen(1234, () => {
    console.log("Server is successfully listening on port 1234...");
    
});
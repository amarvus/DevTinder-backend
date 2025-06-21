const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong!");
    }
});

app.get("/getUserData", (req, res) => {
    try {
         throw new Error("theredoc");
         res.send("User data sent.");
    } catch (err) {
        res.status(500).send("Catched something went wrong!");
    }
    
});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Now Something went wrong!");
    }
});

app.listen(1234, () => {
    console.log("Server is successfully listening on port 1234...");
    
});
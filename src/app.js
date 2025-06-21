const express = require("express");

const app = express();


app.get("/user/:UserId/:name", (req, res) => {
    console.log(req.params);
    res.send({firstname: "Amarnath", lastname: "Kumar"});
});


app.listen(1234, () => {
    console.log("Server is successfully listenong on port 1234...");
    
});
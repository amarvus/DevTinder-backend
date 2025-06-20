const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("routing test..");
});

app.use((req, res) => {
    res.send("Hello from the server");
});

app.listen(1234, () => {
    console.log("Server is successfully listenong on port 1234...");
    
});
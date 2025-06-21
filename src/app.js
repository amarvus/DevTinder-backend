const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstname: "Amarnath", lastname: "Kumar"})
})

app.post("/user", (req, res) => {
    res.send("Saved data to DB successfully...")
})

app.delete("/user", (req, res) => {
    res.send("Deleted successfully...")
})

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.listen(1234, () => {
    console.log("Server is successfully listenong on port 1234...");
    
});
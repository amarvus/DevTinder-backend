const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
    //res.send("Route handlers...1");
    next();
},
(req, res) => {
    res.send("Route handlers...2");
}
);

app.listen(1234, () => {
    console.log("Server is successfully listening on port 1234...");
    
});
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://amarnathkumar:JqxdEQWMXFn8GMAn@namastenode.m7getjp.mongodb.net/devTinder");
};

module.exports = connectDB;
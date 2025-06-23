const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
                
            }
        },
    },
    password: {
        type: String,
        required: true,
           validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password :" + value)
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender data invalid [Male, Female, Others]");
            }
        },
    },
    about: {
        type: String,
        default: "Developer",
    },
    skills: {
        type: [String],
    }
},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
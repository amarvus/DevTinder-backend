const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastname, emailId, password} = req.body;

    if(!firstName && !lastname){
        throw new Error("Name is required");
    } else if (!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
        
    }
};

module.exports = {validateSignupData,};
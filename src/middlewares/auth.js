const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "amar";
    const isAdminAuthorized = token === "amar";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "amar";
    const isAdminAuthorized = token === "amar";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};
module.exports = {adminAuth, userAuth};
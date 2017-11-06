module.exports = (req, res, next) => {
    if (req.loggedIn) {
        next();
    } else {
        res.send(
            new Error("You must be logged in to perform this action.")
        );
    }
}
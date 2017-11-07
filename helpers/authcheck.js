module.exports = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.send("You must be logged in to perform this action.");
    }
}
module.exports = {
    validateAuth: (req, res, next) => {
        if (!req.body.username)
            res.status(400).json({ message: "username required" });
        if (!req.body.password)
            res.status(400).json({ message: "password required" });
        next();
    }
};
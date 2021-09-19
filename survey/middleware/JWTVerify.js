const env = require("../env")
var jwt = require('jsonwebtoken');
module.exports = {
    JWTVerify: (req, res, next) => {
        try {

            const token = req.headers.token;
            if (!token)
                res.status(400).json({ message: "Token Required" })
            const decoded = jwt.verify(token, env.JWTsecret);
            console.log(token, decoded);
            req.body.username = decoded.username;
            next();

        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    }
}
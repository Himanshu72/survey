const jwt = require('jsonwebtoken');
const env = require('../env.js');
module.exports = {
    genrateJWT(username, password) {
        const token = jwt.sign({ username, password }, env.JWTsecret);
        return token;
    }
}
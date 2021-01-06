const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: "Authentication invalid."});
    }

    try {
        const decodeToken = jwt.verify(token.slice(7), config.jwt.secret, {
            algorithm: "HS256",
            expiresIn: config.jwt.expiry
        });

        req.user = decodeToken;
        next();

    } catch (error) {
        return res.status(401).json({ messsage: error.message });
    }
};

module.exports = requireAuth;
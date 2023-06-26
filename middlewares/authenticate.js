const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const db = require("../models");
const User = db.User;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication invalid");
    }

    const token = authHeader?.split(" ")[1];
    if (!token) {
        throw new UnauthenticatedError("Authentication invalid");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded?.id) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        const user = User.findOne({
            where: {
                id: decoded.id,
            },
        });
        if (!user) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        req.user = decoded;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
};

module.exports = authenticate;

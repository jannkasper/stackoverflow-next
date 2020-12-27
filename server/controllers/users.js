const User = require("../models/user");
const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');

const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');

exports.signup = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array({onlyFirstError: true });
        return res.status(422).json({ error });
    }

    try {
        const { username } = req.body;

        const hashedPassword = await hashPassword(req.body.password);

        const userData = {
            username: username.toLowerCase(),
            password: hashedPassword
        };

        const existingUsername = await User.findOne({
            username: userData.username
        })

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists."
            });
        };

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
            const token = createToken(savedUser);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const { username, role, id, created, profilePhoto } = savedUser;
            const userInfo = { username, role, id, created, profilePhoto };

            return res.json({
                message: "User created!",
                token,
                userInfo,
                expiresAt
            });
        } else {
            return res.status(400).json({
                message: 'There was a problem creating your account.'
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'There was a problem creating your account.'
        });
    }
};

exports.authenticate = async() => {

}

exports.listUsers = async() => {

}

exports.search = async() => {

}

exports.find = async() => {

}

exports.validateUser = [

]
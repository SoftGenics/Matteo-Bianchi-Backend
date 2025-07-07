const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'Diwkar@321';

const userAuth = (req, res, next) => {
    let authorizationHeader = req.header('Authorization');

    // Check if the Authorization header exists and has the expected format
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Bearer Token not found' });
    }

    // Extract the token without the "Bearer " prefix
    let token = authorizationHeader.split(" ")[1];
    // console.log("token:-", token);

    jwt.verify(JSON.parse(token), secretKey, (err, valid) => {
        req.user = jwt.verify(JSON.parse(token), secretKey);
        if (err) {
            console.log('err', err.message)
            res.status(401).send("Token not found Please login again")
        } else {
            next();
        }
    })
};



module.exports = { userAuth }
const express = require('express');
const route = express.Router();

const registration = require('../controllers/registrationController')


route.post('/api/login', registration.login);

module.exports = route


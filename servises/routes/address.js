const express = require('express')
const route = express.Router();

const addressapi = require('../controllers/addressController')
const {userAuth} = require('../middleware/authmiddleware')

route.post('/addaddress/',userAuth,addressapi.createAddress)
route.get('/getalladdressinfo/',userAuth,addressapi.getalladdressinfo)
route.put('/editaddress/:id',userAuth,addressapi.editaddress)
route.delete('/removeaddress/:id',userAuth,addressapi.removeaddress)
route.get('/getallUserInfo/', addressapi.getallUserinfo)

// Route for creating or updating an address
route.post('/createOrUpdateAddress', userAuth, addressapi.createOrUpdateAddress);

module.exports = route;

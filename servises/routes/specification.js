const express = require('express')
const route = express.Router();

const specificationControoler = require('../controllers/specificationControoler')
// const {userAuth} = require('../middleware/authmiddleware')

route.post('/api/specifics', specificationControoler.specificationPostData)
route.get('/api/specifics/:id', specificationControoler.specificationDataGetbyId)
route.delete('/api/specifics/delete/:id', specificationControoler.specificationDeleteById)

module.exports = route;
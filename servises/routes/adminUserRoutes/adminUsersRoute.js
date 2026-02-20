const express = require('express')
const route = express.Router()

const adminUsers = require('../../controllers/adminUserControllers/adminUsersControllers')

route.post('/admin/signup', adminUsers.signup)
route.post('/admin/login', adminUsers.login)
route.get('/admin/logout', adminUsers.logout)

module.exports = route;
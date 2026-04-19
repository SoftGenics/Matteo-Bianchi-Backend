const express = require('express')
const route = express.Router()

const adminUsers = require('../../controllers/adminUserControllers/adminUsersControllers')
const verifyAdminToken = require('../../middleware/verifyAdminToken')
const isAdmin = require('../../middleware/isAdmin')

route.post('/admin/signup', adminUsers.signup)
route.post('/admin/login', adminUsers.login)
route.get('/admin/logout', adminUsers.logout)
route.post('/seller/login', adminUsers.sellerLogin)
route.get('/seller/logout', adminUsers.sellerLogout)

route.post('/admin/seller', verifyAdminToken, adminUsers.getAdminUsers)
route.get('/admin/seller/all', isAdmin, adminUsers.allSellers)
// route.get('/admin/seller/all', adminUsers.allSellers)
route.put('/seller/update/:admin_id', isAdmin, adminUsers.updateAdminUser);


module.exports = route;
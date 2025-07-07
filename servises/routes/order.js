const express = require('express')
const router = express.Router()
const orderapi = require('../controllers/orderapi')

const {userAuth} = require('../middleware/authmiddleware')

router.post('/order/', userAuth, orderapi.create_order)
router.get('/getorder/', userAuth, orderapi.getorderdetail)

module.exports = router;
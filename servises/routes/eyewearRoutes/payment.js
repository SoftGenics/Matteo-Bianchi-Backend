const express = require('express')
const router = express.Router()
const paymentController = require('../../controllers/eyewearControllers/paymentController')

router.post('/pay/',paymentController.pay)
router.all('/pay-return-url',paymentController.paymentreturn)

module.exports = router;
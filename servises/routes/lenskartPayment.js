const express = require('express')
const router = express.Router()
const lenskartPaymentController = require('../controllers/lenskartPaymentController')

router.post('/order', lenskartPaymentController.getLenskartPayment)
router.post('/verify', lenskartPaymentController.varifyLenskartPayment)
router.get('/details', lenskartPaymentController.paymentDetails)
module.exports = router;
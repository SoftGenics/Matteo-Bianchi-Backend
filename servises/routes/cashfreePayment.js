const express = require('express')
const router = express.Router()
const cashfreePaymentController = require('../controllers/cashfreePaymentController')

router.post('/cashfree-order', cashfreePaymentController.cashfreePayment)
router.post('/cashfree-verify', cashfreePaymentController.cashfreeVerifyPayment)

module.exports = router;
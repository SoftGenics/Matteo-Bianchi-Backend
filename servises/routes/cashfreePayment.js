const express = require('express')
const router = express.Router()
const cashfreePaymentController = require('../controllers/cashfreePaymentController')

router.post('/cashfree-order', cashfreePaymentController.cashfreePayment)
router.post('/cashfree-verify', cashfreePaymentController.cashfreeVerifyPayment)
router.put('/cashfree/orders/update/:id', cashfreePaymentController.cashfreeUpdateOrder)
router.post('/cashfree/orders/number', cashfreePaymentController.getCashfreeOrderByMobile)
router.get('/cashfree/orders/:id', cashfreePaymentController.getCashfreeOrderById)
router.get('/cashfree/orders', cashfreePaymentController.cashfreeDetails)
router.get('/bestseller/product', cashfreePaymentController.bestsellerProduct)

module.exports = router;
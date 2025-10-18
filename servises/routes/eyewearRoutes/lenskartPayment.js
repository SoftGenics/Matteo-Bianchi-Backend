const express = require('express')
const router = express.Router()
const lenskartPaymentController = require('../../controllers/eyewearControllers/lenskartPaymentController')

router.post('/order', lenskartPaymentController.getLenskartPayment)
router.post('/verify', lenskartPaymentController.varifyLenskartPayment)
router.put('/orders/:id', lenskartPaymentController.updateOrderDetails);
router.delete('/orders/:id', lenskartPaymentController.deleteOrderDetails);
router.post('/orders', lenskartPaymentController.getLenskartOrderByMobile);
router.get('/orders/:id', lenskartPaymentController.getLenskartOrderById);
router.get('/details', lenskartPaymentController.paymentDetails)

module.exports = router;
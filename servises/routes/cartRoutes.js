const express = require('express');
const router = express.Router();

const addtocartController = require('../controllers/cartController');
const varifyUserToken = require('../middleware/varifyUserToken');

router.post('/addCart', varifyUserToken, addtocartController.addProductToCart)
router.get('/Cart', varifyUserToken, addtocartController.getCartProduct)
router.delete('/Cart/:cart_id',varifyUserToken,addtocartController.removeProductFromCart)

module.exports = router
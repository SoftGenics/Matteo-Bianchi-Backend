const express = require('express')
const router = express.Router();
const offerController = require('../controllers/offers')

router.post('/Addoffer', offerController.PostOffer)
router.get('/getproduct_with_offer', offerController.getproductwithoffer)
router.get('/getproductwithoffersinfo', offerController.getproductwithoffersinfo)
// router.delete('/item/delete/:id', itemController.deleteItem)

module.exports = router;
const express = require('express');
const route = express.Router();
// const {userAuth} = require('../middleware/authmiddleware')
const {userAuth} = require('../../middleware/authmiddleware')
// const multer = require('multer');
// const path = require("path");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// })

// const upload = multer({ storage: storage })

const productsController = require('../../controllers/eyewearControllers/productsController')
const checkPermission = require('../../middleware/checkPermission')
const verifyAdminToken = require('../../middleware/verifyAdminToken')


route.post('/product/', checkPermission('eyewear'), productsController.Addproduct)
route.get('/product/',productsController.getproduct)
route.get('/product/current/seller', verifyAdminToken, productsController.currentSellerEyewearProduct)

route.get('/new/arrivel/',productsController.newArrivel)
route.get('/product/productdetail/:productId',productsController.productdetail)
route.delete('/api/products/delete/:product_id',  checkPermission('eyewear'), productsController.productDeleteById)
route.get('/api/products/all/filter', productsController.fillterData)
route.post('/api/products/all/filter/data', userAuth, productsController.fillterDataget)
route.get('/api/products/all/filter/new', productsController.fillterNewData)
route.put('/api/update/:productId',  checkPermission('eyewear'), productsController.editProduct);

module.exports = route

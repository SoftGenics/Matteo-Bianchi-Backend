const express = require('express')
const router = express.Router()
const seller = require('../controllers/sellerController');
// const {sellerAuth}=require("../middleware/otpverifymiddleware")


router.post('/createSeller/', seller.createseller);
// router.get('/Seller/',seller.viewseller);

router.get('/googledata', seller.runSample);
router.get('/getallseller', seller.getallseller);
router.put('/create_Cridenciel',seller.createCridenciel);
// router.post('/sellerlogin',seller.sellerlogin);
// router.post('/sendotp',seller.sendotp);
// router.post('/verifyotp',sellerAuth,seller.otpverify);
// router.post('/changepassword',sellerAuth,seller.changepassword);

module.exports = router;








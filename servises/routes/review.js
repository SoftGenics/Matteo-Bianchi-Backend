const express = require('express')
const router = express.Router();
const Reviewapi = require('../controllers/review.js')

const {userAuth} = require('../middleware/authmiddleware')

router.post('/review/',userAuth, Reviewapi.AddReviewAndRating)
router.get('/review/allreview/:productId', Reviewapi.getallreview)
router.get('/review/getallmyreviews/',userAuth, Reviewapi.getallmyreviews)

module.exports = router;
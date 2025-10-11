const express = require('express')
const router = express.Router();
const colorcontroler = require('../controllers/color')

router.post('/Addcolor', colorcontroler.Addcolor)

module.exports = router;
const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

const sliderController = require('../controllers/sliderController')

route.post('/api/slider', upload.single("slider_url"), sliderController.createSlider)
route.get('/api/slider', sliderController.getSlider)
route.put('/api/slider/edit/:id', upload.single('slider_url'),sliderController.editSliderById)

module.exports = route
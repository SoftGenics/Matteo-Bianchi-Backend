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

const carouselController = require('../controllers/carouselController')

route.post('/api/carousel', upload.single('image_url'), carouselController.banner)
route.get('/api/carousel/all', carouselController.getAllData)
route.get('/api/carousel/:id', carouselController.getbyId)
route.get('/api/carousel/all/filter', carouselController.filterData)
route.delete('/api/carousel/delete/:id', carouselController.deleteBannerById)
route.put('/api/carousel/edit/:id', upload.single('image_url'),carouselController.editBannerById)

module.exports = route
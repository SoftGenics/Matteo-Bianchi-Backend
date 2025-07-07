const express = require('express')
const router = express.Router();
const videoapi = require('../controllers/videoapi')

router.post('/addvideo/web',videoapi.Addvideo )
router.get('/getvideo/web',videoapi.getvideo)
router.get('/getvideoinfobyVideothumnail_id/web/:Videothumnail_id', videoapi.getvideoinfobyVideothumnail_id)

module.exports = router;
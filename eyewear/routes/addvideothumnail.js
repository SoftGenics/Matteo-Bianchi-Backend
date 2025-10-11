
const express = require('express')
const router = express.Router();
const videothumbnailapi = require('../controllers/addvideothumnail')

router.post('/addvideothumnail', videothumbnailapi.addvideothumnail )
router.get('/getvideothumbnail', videothumbnailapi.getvideothumbnail)
router.delete('/deleteVideoThumbnail/:Videothumnail_id', videothumbnailapi.deleteThumbnail)

module.exports = router;
const express = require('express');
const { getTranscript, getResponse } = require('../controllers/openAi');
const multer = require('multer');
const { UPLOAD_AUDIO_DIR } = require('../config/config');
const path = require('path');
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, UPLOAD_AUDIO_DIR)
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '.wav');
    }

})
// Creating a multer instance to handle the file upload
const upload = multer({ storage });

router.post('/getTranscript', upload.single('audioFile'), getTranscript);
router.post('/getResponse', getResponse);

module.exports = router;

const express = require('express')
const router = express.Router();
const { UploadFile, GetFiles, DownloadFile } = require('../controller/userController.js');
const { upload } = require('../middleware/multer.js');
router.post('/getfile', GetFiles)
router.post('/uploadFile', upload.single('file'), UploadFile)
router.post('/downloadFile', DownloadFile)
module.exports = router;
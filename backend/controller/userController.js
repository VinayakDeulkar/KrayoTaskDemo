const myBucket = require('../config/config')
require('dotenv').config()
const UploadFile = async (req, res) => {
    try {
        const fileName = req.body.googleId + "_" + req.file.originalname.toLowerCase().split(" ").join("-");
        const params = {
            Bucket: process.env.NODE_BUCKETNAME,
            Key: fileName,
            Body: req.file.buffer
        };
        myBucket.putObject(params, (err, respones) => {
            if (err) {
                console.log(err)
            }
            else {
                return res.status(200).json({ msg: 'File Uploaded Successfully!!!!!' })
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
const GetFiles = async (req, res) => {
    try {
        const dataList = []
        const params = {
            Bucket: process.env.NODE_BUCKETNAME,
            Prefix: req.body.id
        }
        const resData = myBucket.listObjects(params, (err, respones) => {
            if (err) console.log(err)
            else {
                return res.status(200).send(respones.Contents)
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}
const DownloadFile = async (req, res) => {
    try {
        const param = {
            Bucket: process.env.NODE_BUCKETNAME,
            Key: req.body.dataKey,
            Expires: 20,
        };
        const url = myBucket.getSignedUrl('getObject', param)
        return res.send(url)
    }
    catch (err) {
        console.log(err);
    }
}
const getSignedUrl = async (req, res) => {
    try {
        await myBucket.createPresignedPost({
            Fields: {
                key: "",
            },
            Expires: 30,
            Bucket: process.env.NODE_BUCKETNAME,
        }, (err, signed) => {
            res.json("login success")
        })
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = { UploadFile, GetFiles, DownloadFile, getSignedUrl }
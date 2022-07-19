const myBucket = require('../config/config')
require('dotenv').config()
const UploadFile = async (req, res) => {
    try {
        const fileName = req.body.googleId + "_" + req.file.originalname.toLowerCase().split(" ").join("-");
        const params = {
            Bucket: process.env.NODE_BUCKETNAME,
            Key: fileName,
            Body: req.file.buffer,
            ACL: 'public-read',
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
            Bucket: process.env.NODE_BUCKETNAME
        }

        const resData = myBucket.listObjects(params, (err, respones) => {
            if (err) console.log(err)
            else {
                respones.Contents.map((ele) => {
                    const l = ele.Key.includes(req.body.googleId)
                    if (l) {
                        dataList.push(ele.Key)
                    }
                })
                return res.status(200).send(dataList)
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}
const DownloadFile = async (req, res) => {
    try {
        const link = `https://${process.env.NODE_BUCKETNAME}.s3.${process.env.NODE_REGION}.amazonaws.com/${req.body.dataKey}`

        return res.send({ data: link })
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = { UploadFile, GetFiles, DownloadFile }
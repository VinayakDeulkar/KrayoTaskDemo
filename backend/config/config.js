const AWS = require('aws-sdk')
require('dotenv').config()
AWS.config.update({
    accessKeyId: process.env.NODE_ACCESSKEY,
    secretAccessKey: process.env.NODE_SECRETKEY
})
const myBucket = new AWS.S3({
    params: { Bucket: process.env.NODE_BUCKETNAME },
    region: process.env.NODE_REGION,
})
module.exports = myBucket;
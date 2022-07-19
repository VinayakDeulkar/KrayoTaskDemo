import AWS from 'aws-sdk'
AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_SECRETKEY
})
const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_BUCKETNAME },
    region: process.env.REACT_APP_REGION,
})

export default myBucket
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const MENU_BUCKET_NAME = "foodtruck-vendor-info";

let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : "",
    "secretAccessKey" : ""
};
AWS.config.update(awsConfig);

const s3 = new AWS.S3();
const fileFilter = (req, file, cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
        console.log('filetype',file.mimeType);
        cd(null,true);
    }else{
        cb(new Error('Invalid Mime Type, only JPEG and PNG'),false);
    }
};

const upload = multer({
    storage: multerS3({
        s3,
        bucket: MENU_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: 'VENDOR_MENU_IMAGE'});
        },
        key: function (req, file, cb) {
            cb(null, Date.now()+file.originalname)
        }
    })
});


module.exports = upload;

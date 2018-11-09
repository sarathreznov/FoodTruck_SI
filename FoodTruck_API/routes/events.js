const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const upload = require('../services/file-upload');

const singleImage = upload.single('image');


let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : "",
    "secretAccessKey" : ""
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
const VENDOR_EVENTS_TABLE = "vendoreventdetails";

router.post('/', function(req,res){
    console.log('Adding new vendor event' , req.body);
    let vendorInterests = {
        "vendorusername" : req.body.vendorusername,
        "eventTitle" : req.body.eventTitle,
        "eventDescription" : req.body.eventDescription,
        "eventStartDate" : req.body.eventStartDate,
        "eventEndDate" : req.body.eventEndDate,
        "eventImage" : req.body.eventImage
    };
    let eventsData = {
        TableName : VENDOR_EVENTS_TABLE,
        Item : vendorInterests
    };
    docClient.put(eventsData, function(err,result){
        if(err){
            console.log('Error inserting vendor events' , err);
            res.status(500).json({
                message : 'Error inserting vendor events',
                error : err
            });
        }else{
            console.log('Successfully inserted vendor events', result);
            res.status(200).json({
                message : 'Success',
                result : result
            });
        }
    });

});

router.post('/uploadCoupons', function(req,res) {
    singleImage(req,res, function(err){
        if(err){
            return res.status(422).send({errors:[{title:'File upload error', detail:err.message}]});
        }
        return res.json({'imageUrl':req.file.location});
    });
});

router.get('/:vendorusername', function(req,res) {

    let vendorusername = req.params.vendorusername;
    console.log("View events by specific vendor " , vendorusername);
    let vendorData = {
        TableName: VENDOR_EVENTS_TABLE,
        Key: {
            "vendorusername": vendorusername
        }
    };
    docClient.get(vendorData, function(err, result) {
        if (err){
            res.status(500).json({
                message : 'Error reading vendor events',
                error: err
            });
        } else{
            console.log('User data read successfully', result);
            if(Object.keys(result).length === 0 && result.constructor === Object){
                res.status(200).json({
                    message : 'Event does not exist',
                    result : false
                });
            }
            else {
                res.status(200).json({
                    message : 'Success',
                    result : result.Item
                });
            }
        }
    });
});

//view all the upcoming events
router.get('/', function(req,res) {
    console.log('Reading all vendor event details ');
    let vendorData = {
        TableName: VENDOR_EVENTS_TABLE
    };
    docClient.scan(vendorData, function(err, result) {
        if (err){
            res.status(500).json({
                message : 'Error reading events',
                error: err
            });
        } else{
            console.log('Event data read successfully', result);
            if(Object.keys(result).length === 0 && result.constructor === Object){
                res.status(200).json({
                    message : 'There are no users',
                    result : false
                });
            }
            else {
                res.status(200).json({
                    result
                });
            }
        }
    });

});

module.exports = router;

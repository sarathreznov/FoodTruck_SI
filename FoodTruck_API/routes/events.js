const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const upload = require('../services/file-upload');
const stringBuilder = require("string-builder");
const singleImage = upload.single('image');
var customerList = "";
const CUSTOMER_INTERESTS_TABLE = "customerinterest";


let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : `${accessKeyId}`,
    "secretAccessKey" : `${secretAccessKey}`
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
const VENDOR_EVENTS_TABLE = "vendoreventdetails";

router.post('/', function(req, res){
    console.log('Adding new vendor event' , req.body);
    fetchSubscriptions(req,res);
  });

  function fetchSubscriptions(req,res){
      let sb = new stringBuilder();
      console.log("Looking for customer subscriptions for a vendor : ", req.body.vendorusername);
      var vendorusername = req.body.vendorusername;
      let userData = {
          TableName: CUSTOMER_INTERESTS_TABLE
      };
      docClient.scan(userData, function(err,result){
          if(err){
              console.log('Error reading customer interests',err);
          } else{
              var content = JSON.stringify(result.Items);
              var jsonObj = JSON.parse(content);
              for(let i=0;i<jsonObj.length;i++){
                  var data = jsonObj[i];
                  if(data.vendorusername === vendorusername){
                      sb.append(data.customerusername + ",");
                  }
                  customerList = sb.toString();
              }
              console.log(customerList);
              let vendorInterests = {
                  "vendorusername" : req.body.vendorusername,
                  "eventTitle" : req.body.eventTitle,
                  "eventDescription" : req.body.eventDescription,
                  "eventStartDate" : req.body.eventStartDate,
                  "eventEndDate" : req.body.eventEndDate,
                  "eventImage" : req.body.eventImage,
                  "customerList" : customerList
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
          }
      });
  }

//
//     let vendorInterests = {
//         "vendorusername" : req.body.vendorusername,
//         "eventTitle" : req.body.eventTitle,
//         "eventDescription" : req.body.eventDescription,
//         "eventStartDate" : req.body.eventStartDate,
//         "eventEndDate" : req.body.eventEndDate,
//         "eventImage" : req.body.eventImage
//     };
//     let eventsData = {
//         TableName : VENDOR_EVENTS_TABLE,
//         Item : vendorInterests
//     };
//     docClient.put(eventsData, function(err,result){
//         if(err){
//             console.log('Error inserting vendor events' , err);
//             res.status(500).json({
//                 message : 'Error inserting vendor events',
//                 error : err
//             });
//         }else{
//             console.log('Successfully inserted vendor events', result);
//             res.status(200).json({
//                 message : 'Success',
//                 result : result
//             });
//         }
//     });
//
// });

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
        KeyConditionExpression : "vendorusername = :vendorusername",
        ExpressionAttributeValues: {
            ":vendorusername": vendorusername
        }
    };
    docClient.query(vendorData, function(err, result) {
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
                    result : result.Items
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

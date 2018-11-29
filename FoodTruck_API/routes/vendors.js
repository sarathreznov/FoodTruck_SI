const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const MENU_BUCKET_NAME = "foodtruck-vendor-info";
const uuid = require('uuid/v1');

const bcrypt = require('bcryptjs');
const upload = require('../services/file-upload');

const singleImage = upload.single('image');

let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : `${accessKeyId}`,
    "secretAccessKey" : `${secretAccessKey}`
};
AWS.config.update(awsConfig);
const s3 = new AWS.S3();

let docClient = new AWS.DynamoDB.DocumentClient();

const VENDOR_TABLE = "vendortable";

//GET /vendors/
router.get('/', function(req, res){

    let vendorData = {
        TableName: VENDOR_TABLE,
    };
    docClient.scan(vendorData, function(err, result) {
        if (err){
            res.status(500).json({
                message : 'Error reading vendors',
                error: err
            });
        } else{
          console.log('User data read successfully hmm', result);
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

//GET /vendors/uploadeventimage
router.get('/uploadeventimage', function(req, res) {
  const vendor = req.query.vendorusername;
  const key = `${vendor}/${uuid()}.jpeg`;
  if(!vendor){
    res.status(500).json({
        message : 'No vendor user specified'
    });
  } else {
    s3.getSignedUrl('putObject', {
      Bucket: MENU_BUCKET_NAME,
      ContentType: 'image/jpeg',
      Key: key
    }, function (err, url){
      if (err){
          res.status(500).json({
              message : 'Error uploading event image',
              error: err
          });
        } else {
          res.send({ key, url });
        }
      });
  }
});

//GET /vendors/:userName
router.get('/:userName', function(req, res){
    console.log('Reading vendor details ', req.params.userName);
    let vendorusername = req.params.userName;
    let vendorData = {
        TableName: VENDOR_TABLE,
        Key: {
            "vendorusername": vendorusername,
            "email": vendorusername
        }
    };
    docClient.get(vendorData, function(err, result) {
        if (err){
            res.status(500).json({
                message : 'Error reading vendors',
                error: err
            });
        } else{
          console.log('User data read successfully', result);
          if(Object.keys(result).length === 0 && result.constructor === Object){
            res.status(200).json({
              message : 'User doesnt exist',
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

//POST /vendors
router.post('/', function(req, res) {
   console.log('Inserting vendor data ', req.body);

            let vendorData = {
                "vendorusername" : req.body.vendorusername,
                "email" : req.body.email
                // "address" : req.body.address,
                // "businessphone" : req.body.businessphone,
                // "foodtruckname" : req.body.foodtruckname,
                // "password" : hash,
                // "ClosingHrs" : req.body.closingHrs,
                // "EndDate": req.body.endDate,
                // "IsWorkingWeekEnd" : req.body.isWorkingWeekEnd,
                // "OpeningHrs" : req.body.openingHrs,
                // "StartDate" : req.body.startDate,
                // "Operatingloc" : req.body.operatingloc
            };
        let insertVendor = {
            TableName : VENDOR_TABLE,
            Item : vendorData,
            ReturnValues: 'ALL_OLD'
        };
        docClient.put(insertVendor, function(err, result){
          console.log(result);
            if(err){
                console.log('Error inserting user information' , err);
                res.status(500).json({
                    error:err,
                    message : 'Error inserting user information'
                });
            }else{
                console.log('User data inserted successfully', JSON.stringify(result, null, 2));
                res.status(200).json({
                    message : 'Success',
                    result
                });
            }
        });
    });

  router.patch('/', function(req, res){
      console.log('Inside vendor update', req.body);
      let vendorUpdate = {
        TableName : VENDOR_TABLE,
        Key : {
            "vendorusername" : req.body.vendorusername,
            "email" : req.body.vendorusername
        },
        UpdateExpression: "set address = :byAddress, businessPhone= :byBusinessPhone,"
          +"foodtruckname = :byfoodtruckname, closingHrs = :byClosingHrs,"
          +"isWorkingWeekEnd = :byIsWorkingWeekEnd, openingHrs = :byOpeningHrs,"
          + "operatingLoc = :byOperatingloc, menu1url = :byMenu1, menu2url = :byMenu2",
          ExpressionAttributeValues : {
            ":byAddress":req.body.address,
            ":byBusinessPhone":req.body.phone,
            ":byfoodtruckname":req.body.foodtruckname,
            ":byClosingHrs":req.body.closingHrs,
            ":byIsWorkingWeekEnd":req.body.isWorkingWeekEnd,
            ":byOpeningHrs":req.body.openingHrs,
            ":byOperatingloc":req.body.location,
            ":byMenu1":req.body.menu1url,
            ":byMenu2":req.body.menu2url
          },
          ReturnValue:"UPDATED_NEW"
      };
      console.log('Updating the vendor');
      docClient.update(vendorUpdate, function(err, result){
          if(err){
              console.log('Error updating vendor', err);
              res.status(500).json({
                  message : 'Error updating vendor',
                  error:err
              });
          }else{
              console.log('Vendor updated successfully', result);
              res.status(200).json({
                  message : 'Updated success',
                  result : result
              });
          }
      });
  });

router.post('/deleteVendor', function(req,res){
   console.log('Inside delete vendor' , req.body);
   let deleteUser = {
     TableName: VENDOR_TABLE,
     Key:{
         "vendorusername" : req.body.vendorusername,
         "email" : req.body.email
     }
   };
   docClient.delete(deleteUser, function(err,result) {
       if(err){
           console.log('Error deleting user ', err);
           res.status(500).json({
               message : 'Error deleting user',
               error : err
           })
       }else{
           console.log('User deleted success',result);
           res.status(200).json({
               message : 'Vendor deleted',
               result : result
           });
       }
   })
});





// router.get('/uploadMenu', function(req, res) {
//   s3.getSignedUrl('putObject', {
//
//   });
// });


router.post('/uploadMenu', function(req, res) {
    singleImage(req, res, function(err){
        if(err){
            return res.status(422).send({errors:[{title:'File upload error', detail:err.message}]});
        }
            return res.json({'imageUrl':req.file.location});
    });
});

module.exports = router;

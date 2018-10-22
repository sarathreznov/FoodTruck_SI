const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const upload = require('../services/file-upload');

const singleImage = upload.single('image');
const s3 = new AWS.S3();

let awsConfig = {
    "region" : "us-east-2",
    "endPoint" : "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId" : "AKIAIMEZE5ZMLNKU5W2A",
    "secretAccessKey" : "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const VENDOR_TABLE = "vendortable";

router.post('/insertVendor', function(req,res) {
   console.log('Inserting vendor data ', req.body);
    bcrypt.hash(req.body.password,10,(err,hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }else{
            let vendorData = {
                "vendorusername" : req.body.vendorusername,
                "email" : req.body.email,
                "address" : req.body.address,
                "businessphone" : req.body.businessphone,
                "foodtruckname" : req.body.foodtruckname,
                "password" : hash,
                "ClosingHrs" : req.body.closingHrs,
                "EndDate": req.body.endDate,
                "IsWorkingWeekEnd" : req.body.isWorkingWeekEnd,
                "OpeningHrs" : req.body.openingHrs,
                "StartDate" : req.body.startDate,
                "Operatingloc" : req.body.operatingloc
            };
        let insertVendor = {
            TableName : VENDOR_TABLE,
            Item : vendorData
        };
        docClient.put(insertVendor, function(err,result){
            if(err){
                console.log('Error inserting vendor details');
                res.status(500).json({
                    message : 'Error inserting vendor details',
                    error: err
                });
            }else{
                console.log('Vendor insertion success');
                res.status(200).json({
                    message : 'Insert Vendor Success',
                    result : result
                });
            }
        })

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

router.post('/updateVendor' , function(req,res){
    console.log('Inside vendor update' , req.body);
    let vendorUpdate = {
      TableName : VENDOR_TABLE,
      Key : {
          "vendorusername" : req.body.vendorusername,
          "email" : req.body.email
      },
      UpdateExpression: "set  address = :byAddress, businessphone= :byBusinessPhone,"
        +"foodtruckname = :byfoodtruckname, closingHrs = :byClosingHrs, EndDate = :byEndDate,"
        +"IsWorkingWeekEnd = :byIsWorkingWeekEnd, OpeningHrs = :byOpeningHrs, StartDate = :byStartDate, "
        + "operatingloc = :byOperatingloc",
        ExpressionAttributeValues : {
          ":byAddress":req.body.address,
          ":byBusinessPhone":req.body.businessphone,
          ":byfoodtruckname":req.body.foodtruckname,
          ":byClosingHrs":req.body.closingHrs,
          ":byEndDate":req.body.EndDate,
          ":byIsWorkingWeekEnd":req.body.IsWorkingWeekEnd,
          ":byOpeningHrs":req.body.OpeningHrs,
          ":byStartDate":req.body.StartDate,
          ":byOperatingloc":req.body.operatingloc
        },
        ReturnValue:"UPDATED_NEW"
    };
    console.log('Updating the vendor');
    docClient.update(vendorUpdate , function(err,result){
        if(err){
            console.log('Error updating vendor',err);
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

router.post('/readVendor', function(req,res){
    console.log('Reading vendor details ', req.body);
    let vendorusername = req.body.vendorusername;
    let vendorData = {
        TableName: VENDOR_TABLE,
        Key: {
            "vendorusername": vendorusername,
            "email": req.body.email
        }
    };
    docClient.get(vendorData, function(err, result) {
        if (err){
            res.status(500).json({
                message : 'Error reading vendors',
                error: err
            })
        } else{
            res.status(200).json({
                message : 'Success',
                result : result
            })
        }
    });

});

router.post('/uploadMenu', function(req,res) {
    singleImage(req,res, function(err){
        if(err){
            return res.status(422).send({errors:[{title:'File upload error', detail:err.message}]});
        }
            return res.json({'imageUrl':req.file.location});
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const upload = require('../services/file-upload');

const singleImage = upload.single('image');
const s3 = new AWS.S3();

let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : "",
    "secretAccessKey" : ""
};
AWS.config.update(awsConfig);

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

// update vendor details call
router.put('/:vendorusername', function(req,res){
    console.log("Updating vendor information for user  " , req.params.vendorusername);
    console.log("Vendor body information ", req.body);
    let vendorUpdate = {
        TableName : VENDOR_TABLE,
        Key : {
            "vendorusername" : req.params.vendorusername,
            "email" : req.params.vendorusername
        },
        UpdateExpression: "set  address = :byAddress, businessPhone= :byBusinessPhone,"
            +"foodtruckname = :byfoodtruckname, closingHrs = :byClosingHrs, endDate = :byEndDate,"
            +"isWorkingWeekEnd = :byIsWorkingWeekEnd, openingHrs = :byOpeningHrs, startDate = :byStartDate, "
            + "operatingLoc = :byOperatingLoc, imageUrl = :byImageUrl",
        ExpressionAttributeValues : {
            ":byAddress":req.body.address,
            ":byBusinessPhone":req.body.businessPhone,
            ":byfoodtruckname":req.body.foodtruckname,
            ":byClosingHrs":req.body.closingHrs,
            ":byEndDate":req.body.endDate,
            ":byIsWorkingWeekEnd":req.body.isWorkingWeekEnd,
            ":byOpeningHrs":req.body.openingHrs,
            ":byStartDate":req.body.startDate,
            ":byOperatingLoc":req.body.operatingLoc,
            ":byImageUrl":req.body.imageURL
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


//POST /vendors insert new vendor call
router.post('/', function(req, res) {
    console.log('Inserting vendor data ', req.body);

    let vendorData = {
        "vendorusername" : req.body.vendorusername,
        "email" : req.body.email
    };
    let insertVendor = {
        TableName : VENDOR_TABLE,
        Item : vendorData,
        ReturnValues: 'ALL_OLD'
    };
    docClient.put(insertVendor, function(err, result){
        console.log(result);
        if(err){
            console.log('Error inserting vendor information' , err);
            res.status(500).json({
                error:err,
                message : 'Error inserting vendor information'
            });
        }else{
            console.log('Vendor data inserted successfully', JSON.stringify(result, null, 2));
            res.status(200).json({
                message : 'Success',
                result
            });
        }
    });
});

router.delete('/:vendorusername', function(req,res){
    console.log('Inside delete vendor' , req.params);
    let deleteUser = {
        TableName: VENDOR_TABLE,
        Key:{
            "vendorusername" : req.params.vendorusername,
            "email" : req.params.vendorusername
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

router.post('/uploadMenu', function(req,res) {
    singleImage(req,res, function(err){
        if(err){
            return res.status(422).send({errors:[{title:'File upload error', detail:err.message}]});
        }
        return res.json({'imageUrl':req.file.location});
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
// const config = require('config');


let awsConfig = {
    "region" : "us-east-1",
    "endPoint" : "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId" : "",
    "secretAccessKey" : ""
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const CUSTOMER_INTERESTS_TABLE = "customerinterest";

//insert interests
router.post('/', function(req,res){
    console.log('Inserting into customer interests' , req.body);
    let custInterests = {
        "customerusername" : req.body.customerusername,
        "vendorusername" : req.body.vendorusername,
        "comments" : req.body.comments,
        "rating" : req.body.rating,
        "sendPromotions" : req.body.sendPromotions
    };
    let interestData = {
        TableName : CUSTOMER_INTERESTS_TABLE,
        Item : custInterests
    };
    docClient.put(interestData, function(err,result){
        if(err){
            console.log('Error inserting user interests' , err);
            res.status(500).json({
                error:err,
                message : 'Error inserting user information'
            });
        }else{
            console.log('User interests inserted successfully', JSON.stringify(result, null, 2));
            res.status(200).json({
                message : 'Success',
                result
            });
        }
    });
});

//read interests for a given customer
router.get('/:customerusername', function(req,res){
    console.log('Reading user interests' , req.params.customerusername);
    const username = req.params.customerusername;
    let userData = {
        TableName: CUSTOMER_INTERESTS_TABLE,
        KeyConditionExpression: "#username = :customerusername",
        ExpressionAttributeNames: {
            "#username"  : "customerusername"
        },
        ExpressionAttributeValues: {
            ":customerusername" : username
        }
    };
    docClient.query(userData, function(err,result){
        if(err){
            console.log('Error reading customer interests');
            res.status(500).json({
                message : 'Error reading customer interests',
                error : err
            });
        } else{
            console.log('reading customer interests', result);
            res.status(200).json({
                message : 'Reading customer interests',
                result : result
            });
        }
    });
});


router.post('/updateInterests' , function(req,res){
    console.log('Updating interests' , req.body);
    let custInterests = {
        "customerusername" : req.body.customerusername,
        "vendorusername" : req.body.vendorusername,
        "comments" : req.body.comments,
        "rating" : req.body.rating,
        "sendpromotions" : req.body.sendpromotions
    };
    let interestData = {
        TableName : CUSTOMER_INTERESTS_TABLE,
        Key : {
            "customerusername" : req.body.customerusername,
            "vendorusername" : req.body.vendorusername
        },
        UpdateExpression: "set  comments = :byComments, rating = :byRating, sendpromotions = :bySendPromotions",
        ExpressionAttributeValues :{
            ":byComments" : req.body.comments,
            ":byRating" : req.body.rating,
            ":bySendPromotions" : req.body.sendpromotions
        },
        ReturnValue:"UPDATED_NEW"
    };

    docClient.update(interestData, function(err,result){
        if(err){
            console.log('error updating user interests');
            res.status(500).json({
                message : 'Error updating user interests',
                error : err
            });
        } else{
            console.log('Update successful');
            res.status(200).json({
                message : 'updated successfully',
                result : result
            })
        }
    });
});

router.delete('/deleteInterests', function(req,res){
    console.log('Delete user interests' , req.body);
    let deleteData = {
        TableName:CUSTOMER_INTERESTS_TABLE,
        Key: {
            "customerusername" : req.body.customerusername,
            "vendorusername" : req.body.vendorusername
        }
    };
    docClient.delete(deleteData,function(err,result){
        if(err){
            console.log('Error delete interests',err);
            res.status(500).json({
                message : 'Error delete interests',
                error : err
            })
        } else{
            console.log('Success');
            res.status(200).json({
                message : 'Success',
                result : result
            });
        }
    });
});

module.exports = router;


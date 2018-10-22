const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

let awsConfig = {
    "region" : "us-east-2",
    "endPoint" : "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId" : "AKIAIMEZE5ZMLNKU5W2A",
    "secretAccessKey" : "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const CUSTOMER_INTERESTS_TABLE = "customerinterest";

router.post('/insertInterests', function(req,res){
   console.log('Inserting into customer interests' , req.body);
   let custInterests = {
       "customerusername" : req.body.customerusername,
       "vendorusername" : req.body.vendorusername,
       "comments" : req.body.comments,
       "rating" : req.body.rating,
       "sendpromotions" : req.body.sendpromotions
   };
   let interestData = {
       TableName : CUSTOMER_INTERESTS_TABLE,
       Item : custInterests
   };
   docClient.put(interestData, function(err,result){
      if(err){
          console.log('Error inserting customer interests' , err);
          res.status(500).json({
              message : 'Error inserting customer interests',
              error : err
          });
      }else{
          console.log('Successully inserted customer interests', result);
          res.status(200).json({
              message : 'Success',
              result : result
          });
      }
   });
});

router.post('/readInterests', function(req,res){
   console.log('Reading user interests' , req.body);
   let userData = {
       TableName : CUSTOMER_INTERESTS_TABLE,
       Key : {
           "customerusername" : req.body.customerusername,
           "vendorusername" : req.body.vendorusername
       }
   };
   docClient.getItem(userData, function(err,result){
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

router.post('/deleteInterests', function(req,res){
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


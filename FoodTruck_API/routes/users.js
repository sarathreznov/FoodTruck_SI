const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

let awsConfig = {
    "region" : "us-east-2",
    "endPoint" : "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId" : "",
    "secretAccessKey" : ""
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const CUSTOMER_TABLE = "customertable";

router.post('/insertUser', function(req,res,next) {
   console.log('inserting user data' , req.body);
   let newUser = {
       "username" : req.body.username,
       "email" : req.body.email
   };
   let insertData = {
       TableName: CUSTOMER_TABLE,
       Item: newUser
   };
   docClient.put(insertData, function(err,result){
       if(err){
           console.log('Error inserting user information' , err);
           res.status(500).json({
               error:err,
               message : 'Error inserting user information'
           });
       }else{
           console.log('User data inserted successfully' , result);
           res.status(201).json({
               message : 'Success',
               result : {result}
           });
       }
   })
});

router.post('/deleteUser', function(req,res) {
   console.log('Inside delete user ', req.body);
   let deleteData = {
      TableName : CUSTOMER_TABLE,
      Key : {
          "username" : req.body.username
      }
   };

   docClient.delete(deleteData, function(err,result){
      if(err){
       console.log('Error deleting user ', err);
       res.status(500).json({
           message : 'Error deleting user',
           error: err
       });
      }else{
          console.log('Delete user success' , result);
          res.status(200).json({
             message : 'Delete user success',
             result : result
          });
      }
   });
});


router.post('/readUser', function(req, res) {
  console.log('reading user data' , req.body.username);
  let userName = req.body.username;
  let userData = {
      TableName : CUSTOMER_TABLE,
      Key: {
          "username" : userName
      }
  };
  docClient.get(userData, function(err,result) {
    if(err){
        console.log('Error retrieving user information' , err);
        res.status(500).json({
            error:err,
            message : 'Error reading user information'
        });
    }else{
        console.log('User data read successfully' , result);
        res.status(200).json({
           message : 'Success',
           result : result
        });
    }
  })
});

router.post('/deleteUser', (req,res,next) => {
    console.log('deleting user data' , req.body.username);
    let userName = req.body.username;
    let deleteUser = {
        TableName : CUSTOMER_TABLE,
        Key : {
            "username" : userName
        }
    };
    docClient.delete(deleteUser, function(err,result){
       if(err){
           console.log('Error deleting user');
           res.status(500).json(err);
       } else{
           console.log('User deleted successfully');
           res.status(200).json({
               result : result,
               message : 'User account deleted'
           });
       }
    });
});


module.exports = router;

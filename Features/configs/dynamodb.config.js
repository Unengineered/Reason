require('dotenv').config()

//set up dynamo db
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
	region: process.env.DYNAMODB_REGION,
	endpoint: process.env.DYNAMODB_ENDPOINT,
	accessKeyId: process.env.DYNAMODB_ACCESSKEY,
	secretAccessKey: process.env.DYNAMODB_SECRET
});
// Create the DynamoDB service object
var dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodbDocClient
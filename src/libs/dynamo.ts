import * as AWS from 'aws-sdk';

//TODO: process.env.IS_OFFLINE to use local dynamoDB
/*const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
});*/

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const dynamoDBClient = dynamoDB;
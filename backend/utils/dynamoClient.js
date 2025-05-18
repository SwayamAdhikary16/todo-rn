const AWS = require('aws-sdk');

AWS.config.update({
  region: 'your-region',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'YourDynamoDBTableName';

module.exports = { dynamoDb, TABLE_NAME };

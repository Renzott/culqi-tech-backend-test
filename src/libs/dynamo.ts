import * as AWS from 'aws-sdk';

const tableName = 'culqi-tech-backend-test-table';

//localhost
/*const dynamoDB  = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
});*/

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const get = async (id: string) => {
    const params = {
        TableName: tableName,
        Key: { id },
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item;
}
 
export const put = async (item: any) => {
    const params = {
        TableName: tableName,
        Item: item,
    };
    return await dynamoDB.put(params).promise();
}
import type { AWS } from '@serverless/typescript';

const dynamodbTables: AWS['resources']['Resources'] = {
    TokenizationTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.tableName}',
            AttributeDefinitions: [
                {
                    AttributeName: 'token',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'token',
                    KeyType: 'HASH',
                },
            ],
            TimeToLiveSpecification: {
                AttributeName: 'expiration',
                Enabled: true,
            },
            BillingMode: 'PAY_PER_REQUEST',
        },
    },
};

export default dynamodbTables;

import type { AWS } from '@serverless/typescript';

const dynamodbTables: AWS['resources']['Resources'] = {
    CommerceTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.commerceTable}',
            AttributeDefinitions: [
                {
                    AttributeName: 'commerce_pk',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'commerce_pk',
                    KeyType: 'HASH',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    },
    TokenizationTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.tokenTable}',
            AttributeDefinitions: [
                {
                    AttributeName: 'token_card',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'token_card',
                    KeyType: 'HASH',
                },
            ],
            TimeToLiveSpecification: {
                AttributeName: 'expiration_ttl',
                Enabled: true,
            },
            BillingMode: 'PAY_PER_REQUEST',
        },
    },
    RegisterCardTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.registerCardTable}',
            AttributeDefinitions: [
                {
                    AttributeName: 'register_pk',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'register_pk',
                    KeyType: 'HASH',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    },
};

export default dynamodbTables;

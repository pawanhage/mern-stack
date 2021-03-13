const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');

const url = ' mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

MongoClient.connect(url)
    .then((client) => {
        console.log('Connected correctly to server');

        const db = client.db(dbname);

        dbOper.insertDocument(db, { name: 'Test Dish', description: 'Tasty' }, 'dishes')
            .then((result) => {
                console.log('Insert Document:\n', result.ops);
                return dbOper.findDocuments(db, 'dishes');
            })
            .then((docs) => {
                console.log('Found docs:\n', docs);
                return dbOper.updateDocument(db, { name: 'Test Dish' }, { description: 'Tasty Dish' }, 'dishes');
            })
            .then((result) => {
                console.log('Updated document:\n', result.result);
                return dbOper.findDocuments(db, 'dishes');
            })
            .then((docs) => {
                console.log('Found docs:\n', docs);
                return db.dropCollection('dishes');
            })
            .then((result) => {
                console.log('Collection Dropped', result);
                return client.close();
            });
    })
    .catch((err) => {
        console.log(err);
    });

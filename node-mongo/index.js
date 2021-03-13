const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');

const url = ' mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dbOper.insertDocument(db, { name: 'Test Dish', description: 'Tasty' }, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);
        dbOper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found docs:\n', docs);
            dbOper.updateDocument(db, { name: 'Test Dish' }, { description: 'Tasty Dish' }, 'dishes', (result) => {
                console.log('Updated document:\n', result.result);
                dbOper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found docs:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Collection Dropped', result);

                        client.close();
                    });
                });
            });
        });
    });
});

/* eslint-disable no-undef */
console.log('INSIDE MONGO INIT', process.env.DB_USER)
// db.auth('root', 'password')
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD)

// TODO. Remove all comments
// process.env.MONGO_INITDB_ROOT_USERNAME,
    // process.env.MONGO_INITDB_ROOT_PASSWORD
// db = db.getSiblingDB('url_shortener'); DB_NAME
db = db.getSiblingDB(process.env.DB_NAME);


db.createUser({
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    // user: 'user',
    // pwd: '123456',
    roles: [{ role: 'readWrite', db: process.env.DB_NAME }],
});

// db = db.getSiblingDB('api_prod_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_prod_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_dev_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_dev_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_test_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_test_db' }],
//   },
// );
// db.createCollection('users');

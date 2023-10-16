const initDb = require('./mongoConfig');
const testDb = require('./mongoTestConfig');

let db;

if (process.env.NODE_ENV === 'test') {
  db = testDb.db;
  testDb.connect();
} else {
  db = initDb();
}

module.exports = db;

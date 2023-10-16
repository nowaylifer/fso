const testingRouter = require('express').Router();
const testDb = require('../config/mongodb/mongoTestConfig');

testingRouter.post('/reset', async (request, response) => {
  await testDb.clearDB();
  response.status(204).end();
});

module.exports = testingRouter;

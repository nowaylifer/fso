const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
const db = mongoose.connection;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  logger.info('connecting to in-memory MongoDB...');
  mongoose.connect(uri);

  db.once('error', (e) => logger.error('error connecting to in-memory MongoDB:', e.message));
  db.once('open', () => logger.info('connected to in-memory MongoDB'));
};

const disconnect = async () => {
  await db.dropDatabase();
  await db.close();
  await mongod.stop();
  logger.info('disconnected from in-memory MongoDB');
};

const clearDB = async () => {
  const collections = db.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  disconnect,
  clearDB,
};

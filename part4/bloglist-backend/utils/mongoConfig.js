const mongoose = require('mongoose');
const logger = require('./logger');
const { MONGODB_URI } = require('./config');

mongoose.set('strictQuery', false);

logger.info('connecting to MongoDB');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('error', (error) => logger.error('error connection to MongoDB:', error.message));
db.once('open', () => logger.info('connected to MongoDB'));

module.exports = db;

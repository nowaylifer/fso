require('dotenv').config();

const SALT_ROUNDS = 10;
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

module.exports = {
  SALT_ROUNDS,
  MONGODB_URI,
  PORT,
};

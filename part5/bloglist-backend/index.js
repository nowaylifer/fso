const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');
const db = require('./config/mongodb');

db.once('open', () => {
  app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));
});

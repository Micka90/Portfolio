require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

require('./database/client').checkConnection();

const app = require('./app/config/expressConfig');
const db = require('./database/client');

const apiRouter = require('./app/routers/router');
app.use('/api', apiRouter);

const errorHandler = require('./app/middleware/errorHandler');
app.use(errorHandler);

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.info(`🚀 Server is listening on port ${port}`);
});

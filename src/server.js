import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import consola from 'consola';
import chalk from 'chalk';
import fileUpload from 'express-fileupload';
import Routes from './routes';
import db from './db/models';
// import utilities from './helper/utilities';
// console.log(route);

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => res.status(200).send('Welcome to Naija Made Shopping App'));

Routes(app);

// app.use('*', (req, res) => utilities.errorstatus(res, 404, 'This Route is Not On This Server'));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use((req, res) => res.status(404).json({
  status: 404,
  error: `Route '${req.url}' Not found`
}));

app.use((error, req, res) => res.status(500).json({
  status: 500,
  error
}));

const dbconnection = db.sequelize;
dbconnection
  .authenticate()
  .then(() => {
    consola.success(chalk.blue('connection to database successful'));
    app.listen(process.env.PORT, () => {
      consola.success(chalk.yellow(`server start at port ${process.env.PORT}`));
    });
  })
  .catch((e) => {
    /* istanbul ignore next */
    console.log(e);
    throw e.message;
  });

export default app;

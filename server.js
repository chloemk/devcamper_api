const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
console.log(`출력해 :`, process.env.NODE_ENV)

//mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Close server & exit process
    server.close(() => process.exit(1));
});
const mongoose = require('mongoose');

//몽구스를 실행하면 프로미스를 리턴한다. 
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
        });   
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold);
    } 
    catch (error) {
        console.error(`Unable to connect to the database ${error.reason}`.red);
    }
}

module.exports = connectDB;
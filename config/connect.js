const mongoose = require('mongoose');

// The empty object is used for options when connecting to the mongodb server
const connectDB = (url) => {
    return mongoose.connect(url,{})
}

module.exports = connectDB
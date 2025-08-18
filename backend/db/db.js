const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/vigilent")
    .then(() => {
        console.log('connected to mongodb')
    })
}

module.exports = connectDB
const mongoose = require('mongoose')
const uri = "mongodb+srv://twinklekhandekar1805:u0Hr2QBz7BYb4ZnE@vigilent.6g06tkq.mongodb.net/?retryWrites=true&w=majority&appName=Vigilent"

function connectDB() {
    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = connectDB
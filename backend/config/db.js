const mongoose = require('mongoose');

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI

const connectDB = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
});

exports = connectDB;

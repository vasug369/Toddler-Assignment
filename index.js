const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const mongoose = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'https://toddler-assignment.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

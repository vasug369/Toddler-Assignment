const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const postRoutes = require('./routes/postRoutes');
const path=require("path")

const app = express();
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Update with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'Frontend')));

app.use('/api/users', userRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


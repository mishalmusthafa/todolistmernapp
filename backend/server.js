const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()
const PORT = process.env.PORT || 5000;
const app = express();

// middleware for getting json requsts from client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcom to the backend' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Error handler middleware
app.use(errorHandler);

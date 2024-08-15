const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

// CORS middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://todolistmernapp-frontend.onrender.com',
    'https://todolistmernapp-backend.up.railway.app',
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

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
app.use('/api/todos', require('./routes/todoRoutes'));

// Error handler middleware
app.use(errorHandler);

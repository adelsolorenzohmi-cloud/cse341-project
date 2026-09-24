const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

// Require passport configuration file
require('./utils/passport');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Session Middleware (Required for OAuth session handling)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport & Passport Session Middleware
app.use(passport.initialize());
app.use(passport.session());

// API Documentation Route (Swagger UI)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Database connection error:', err));

// Mount Authentication Router
app.use('/auth', require('./routes/auth'));

// Mount Main API Router (Zones and Projects)
app.use('/', require('./routes/index'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
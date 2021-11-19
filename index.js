const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Create express server
const app = express();

// Database
dbConnection();

// Public directory
app.use(express.static('public'));

// Body parsing and reading
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
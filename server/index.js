const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

// Setup CORS
app.use(cors({
  origin: [
    'http://localhost',
    /https?:\/\/.*\.azurewebsites\.net/,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Attach the database instance to `req` for reuse in routes
app.use((req, res, next) => {
  req.db = db; // Attach the db instance to req for access in routes
  next();
});

// Function to check if tables exist
const checkIfTablesExist = async () => {
    const tablesQuery = 'SHOW TABLES';
    const [rows] = await db.query(tablesQuery);
    return rows.length > 0; // If there are any tables, return true
};

// Function to create database and tables if they don't exist
const createDatabaseAndTables = async () => {
    const sqlPath = path.join(__dirname, 'mealapp.sql'); // Path to your SQL dump file
    const sql = fs.readFileSync(sqlPath, 'utf8'); // Read the SQL dump file synchronously

    try {
        // Create the database if it doesn't exist
        await db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database ${process.env.DB_NAME} created or exists.`);

        // Switch to the correct database
        await db.query(`USE \`${process.env.DB_NAME}\``);
        console.log(`Using database ${process.env.DB_NAME}`);

        // Check if the tables already exist
        const tablesExist = await checkIfTablesExist();
        if (tablesExist) {
            console.log('Tables already exist. Skipping creation.');
            return; // Skip table creation if they already exist
        }

        // Split SQL dump by semicolon to execute multiple statements
        const queries = sql.split(';');
        for (const query of queries) {
            if (query.trim()) { // Make sure the query is not empty
                await db.query(query); // Execute each query without a callback
            }
        }

        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error while setting up database:', err);
        throw err; // Rethrow the error to stop the server startup
    }
};

// Function to wait for MySQL to be ready before proceeding
const waitForMySQL = async (maxRetries = 10) => {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await db.query('SELECT 1'); // Test query to check if the DB is ready
            console.log('MySQL is ready');
            return;
        } catch (err) {
            retries++;
            console.error(`Waiting for MySQL to be ready (attempt ${retries})...`);
            if (retries >= maxRetries) {
                throw new Error('MySQL not ready after multiple attempts');
            }
            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
        }
    }
};

// Wrap your setup logic in an async function
const startServer = async () => {
    try {
        // Wait for MySQL to be ready
        await waitForMySQL();
        
        // Create database and tables if needed
        await createDatabaseAndTables();

        // Routes
        app.use('/api', userRoutes);       // All user routes 
        app.use('/api/admin', adminRoutes); // All admin routes

        // Test route
        app.get('/api/test', (req, res) => {
          res.send("Test route is working!");
        });

        // Start the server
        app.listen(port, () => {
          console.log(`Server running at http://localhost:${port}`);
        });

    } catch (err) {
        console.error('Error during server startup:', err);
        process.exit(1); // Exit the process with failure if initialization fails
    }
};

// Start the server
startServer();

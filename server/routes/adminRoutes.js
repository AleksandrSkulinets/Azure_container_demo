// routes/adminRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
    const db = req.db;
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const admin = rows[0];
        const match = await bcrypt.compare(password, admin.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error in admin login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

// Route to add a new category
router.post('/categories', async (req, res) => {
    const db = req.db;
    const { name } = req.body;

    try {
        const [result] = await db.query('INSERT INTO category (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ error: "Error adding category" });
    }
});

// Route to update a category
router.put('/categories/:id', async (req, res) => {
    const db = req.db;
    const { id } = req.params;
    const { name } = req.body;

    try {
        await db.query('UPDATE category SET name = ? WHERE cat_id = ?', [name, id]);
        res.status(200).json({ id, name });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Error updating category" });
    }
});

// Route to delete a category
router.delete('/categories/:id', async (req, res) => {
    const db = req.db;
    const { id } = req.params;

    try {
        await db.query('DELETE FROM category WHERE cat_id = ?', [id]);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Error deleting category" });
    }
});

module.exports = router;
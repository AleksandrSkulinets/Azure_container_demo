// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// filters route
router.get('/filters', async (req, res) => {
    try {
        const [results] = await db.query('SELECT filter_id AS id, filter_name AS name FROM filter');
        res.json(results);
    } catch (error) {
        console.error('Error fetching filters:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to get categories with optional filters
router.get('/categories/count', async (req, res) => {
    const db = req.db;
    const filterArray = req.query.filters ? req.query.filters.split(',').map(Number) : [];

    try {
        const query = `
            SELECT 
                c.cat_id AS category_id,
                c.name AS category_name,
                c.color,
                COUNT(DISTINCT r.id) AS recipe_count
            FROM 
                category c
            JOIN 
                recipe r ON c.cat_id = r.category_id
            LEFT JOIN 
                filtered_recipes fr ON r.id = fr.recipe_id
            ${filterArray.length ? `
                WHERE r.id IN (
                    SELECT fr1.recipe_id 
                    FROM filtered_recipes fr1 
                    WHERE fr1.filter_id IN (${filterArray.join(',')}) 
                    GROUP BY fr1.recipe_id 
                    HAVING COUNT(DISTINCT fr1.filter_id) = ${filterArray.length}
                )
            ` : ""}
            GROUP BY 
                c.cat_id;
        `;

        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching category counts:", error);
        res.status(500).json({ error: "Error fetching category counts" });
    }
});



// Route to get recipes by category ID with optional filters
router.get('/:id/recipes', async (req, res) => {
    const db = req.db;
    const categoryId = parseInt(req.params.id, 10);
    const filterArray = req.query.filters ? req.query.filters.split(',').map(Number) : [];

    try {
        const query = `
            SELECT 
                c.name AS categoryName, 
                r.id,
                r.name,
                r.time, 
                r.price, 
                r.difficulty,
                r.image
            FROM 
                recipe r
            JOIN 
                category c ON r.category_id = c.cat_id
            LEFT JOIN 
                filtered_recipes fr ON r.id = fr.recipe_id
            WHERE 
                c.cat_id = ?
                ${filterArray.length ? `
                    AND r.id IN (
                        SELECT fr1.recipe_id 
                        FROM filtered_recipes fr1 
                        WHERE fr1.filter_id IN (${filterArray.join(',')}) 
                        GROUP BY fr1.recipe_id 
                        HAVING COUNT(DISTINCT fr1.filter_id) = ${filterArray.length}
                    )
                ` : ""}
            GROUP BY 
                r.id;
        `;
        
        const [rows] = await db.query(query, [categoryId]);
        const categoryName = rows.length ? rows[0].categoryName : "Category";
        res.json({ categoryName, recipes: rows });
    } catch (error) {
        console.error("Error fetching recipes by category:", error);
        res.status(500).json({ error: "Error fetching recipes by category" });
    }
});


// Route to get a single recipe by ID
router.get('/:catid/:recipeid', async (req, res) => {
    const { catid, recipeid } = req.params;
    
    try {
        const query = `
            SELECT 
                c.name AS categoryName, 
                r.id,
                r.name,
                r.time, 
                r.price, 
                r.difficulty,
                r.image,
                r.description,
                r.prep
            FROM 
                recipe r
            JOIN 
                category c ON r.category_id = c.cat_id
            WHERE 
                c.cat_id = ? AND r.id = ?;
        `;
        
        const [rows] = await db.query(query, [catid, recipeid]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ data: rows[0] });
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
    }
});

module.exports = router;
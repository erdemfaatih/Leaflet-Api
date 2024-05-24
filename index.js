const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_registration',
    password: '1318',
    port: 5432,
});


app.use(express.json()); // JSON verileri almak için middleware

// Yeni konum eklemek için endpoint
app.post('/locations', async (req, res) => {
    const { latitude, longitude, ground_data } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO locations (latitude, longitude, ground_data) VALUES ($1, $2, $3) RETURNING *',
            [latitude, longitude, ground_data]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data to the database');
    }
});



app.get('/locations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from the database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// Yeni SPT verisi eklemek için endpoint
app.post('/spt_data', async (req, res) => {
    const { sondaj_noktasi, derinlik, spt_degeri, zemin_turu, latitude, longitude } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO spt_data (sondaj_noktasi, derinlik, spt_degeri, zemin_turu, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [sondaj_noktasi, derinlik, spt_degeri, zemin_turu, latitude, longitude]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data to the database');
    }
});

// SPT verilerini almak için endpoint
app.get('/spt_data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM spt_data');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from the database');
    }
});


import express from 'express';
import cors from 'cors';
import pool from './src/db.config.js';

// const express = require('express');
// const cors  = use(cors())

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: "https://portfolio-frontend-t1f1.vercel.app" }));         // Autorise les requêtes cross-origin

app.use(express.json());   // Pour parser le JSON

app.get('/api', (req, res) => {
  res.json({ message: "Bonjour depuis Express !" });
});

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.json({ status: "Données reçues !", data: req.body });
});

// test de connexion à la base de données
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connexion réussie !', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de connexion à la base' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

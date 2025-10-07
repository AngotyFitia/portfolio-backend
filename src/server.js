import express from 'express';
import pool from './db.config.js';

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connexion réussie !', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de connexion à la base' });
  }
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));

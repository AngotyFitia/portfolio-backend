import express from 'express';
import pool from '../../db.config.local.js';

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connexion réussie !', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de connexion à la base' });
  }
});

router.get('/test-db2', async (req, res) => {
  try {
    const insertQuery = `
      INSERT INTO utilisateur (nom)
      VALUES ($1)
      RETURNING id_utilisateur, nom
    `;
    const values = ['Jean'];

    const result = await pool.query(insertQuery, values);
    res.json({ message: 'Utilisateur inséré avec succès', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
  }
});

export default router;

// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.send('Bonjour depuis Express!');
});

// Exemple de route POST
app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Données reçues !');
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

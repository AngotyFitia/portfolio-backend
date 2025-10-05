const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());           // Autorise les requêtes cross-origin
app.use(express.json());   // Pour parser le JSON

// Route GET
app.get('/api', (req, res) => {
  res.json({ message: "Bonjour depuis Express !" });
});

// Route POST
app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.json({ status: "Données reçues !", data: req.body });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

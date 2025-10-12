import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Bonjour depuis Express !" });
});

router.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ status: "Données reçues !", data: req.body });
});

export default router;

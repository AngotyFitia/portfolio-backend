import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render("pages/accueil");
});

router.get('/positions', (req, res) => {
  res.render("pages/accueil/crud-position");
});

export default router;

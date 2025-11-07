import express from 'express';

const router = express.Router();
router.get('/description', (req, res) => {
  res.render("pages/accueil/crud-description");
});


export default router;

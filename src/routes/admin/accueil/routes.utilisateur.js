import express from 'express';

const router = express.Router();
router.get('/utilisateurs', (req, res) => {
  res.render("pages/accueil/crud-utilisateur");
});
export default router;

import express from 'express';

const router = express.Router();
router.get('/typesProjets', (req, res) => {
  res.render("pages/projets/crud-type-projet");
});

router.get('/typeGroupes', (req, res) => {
  res.render("pages/projets/crud-type-groupe");
});


export default router;

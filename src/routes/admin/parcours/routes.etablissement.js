import express from 'express';

const router = express.Router();
router.get('/etablissement', (req, res) => {
  res.render("pages/parcours/crud-etablissement");
});

router.get('/typesParcours', (req, res) => {
  res.render("pages/parcours/crud-type-parcours");
});

router.get('/typesContrat', (req, res) => {
    res.render("pages/parcours/crud-type-contrat");
  });

router.get('/listesParcours', (req, res) => {
res.render("pages/parcours/crud-parcours");
});

router.get('/competences', (req, res) => {
    res.render("pages/parcours/crud-competence");
});

export default router;

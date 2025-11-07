import express from 'express';
import Description from '../../models/base/Description.js';
const router = express.Router();

router.get('/description', async (req, res) => {
  const  descriptionRecente = await Description.getRecentDescription();
  res.render('pages/accueil/crud-description', { descriptionRecente: descriptionRecente });
});

router.post('/new-description', async (req, res) => {
  const idUtilisateur = 2;
  const idPosition = 50;
  const { titre, introduction, photo } = req.body;

  const nouvelleDescription = await Description.create(idUtilisateur, idPosition, {titre, introduction, photo} );
  console.log("Nouvelle description créée:", nouvelleDescription);

  res.redirect('/description');
});


export default router;
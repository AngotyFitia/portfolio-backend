import express from 'express';
import Position from '../../models/base/Position.js';
const router = express.Router();

router.get('/positions', async (req, res) => {
  const  positions = await Position.findAll();
  res.render('pages/accueil/crud-position', { positions });
});

router.post('/positions', async (req, res) => {
  const { intitule } = req.body;
  const { etat } = req.body;
  const  positions = await Position.findByIntitule({intitule, etat});
  res.render('pages/accueil/crud-position', { positions });
});

router.post('/new-position', async (req, res) => {
  const { intitule } = req.body;
  const position = await Position.create({ intitule });
  console.log("ato"+intitule);
  res.redirect('/positions');
});

router.delete('/position/:id', async (req, res) => {
  const position = await Position.delete(req.params.id);
  res.redirect('/positions');
});

router.put('/validation/:id', async (req, res) => {
  const position = await Position.validate(req.params.id);
  res.redirect('/positions');
});

router.put('/editer/:id/:intitule', async (req, res) => {
  console.log("atoo");
  console.log(req.params.id);
  console.log(req.params.intitule);
  const position = await Position.update(req.params.id, req.params.intitule);
  res.sendStatus(200);
});

router.put('/position/:id/:intitule', async (req, res) => {
  console.log(req.params.id)
  console.log(req.params.intitule)
  const position = await Position.update(req.params.id, req.params.intitule);
  res.redirect('/positions');
});

export default router;

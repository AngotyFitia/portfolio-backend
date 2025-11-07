import express from 'express';
import Position from '../../../models/base/Position.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render("pages/accueil");
});

// router.get('/positions', (req, res) => {
//   res.render("pages/accueil/crud-position");
// });

// router.get('/positions', async (req, res) => {
//   const positions = await Position.findAll();
//   const formattedPositions = positions.map(p => ({ idPosition: p.idPosition, intitule: p.intitule,  etat: p.etat}));
//   res.render('positions', { positions: formattedPositions });
// });

router.get('/positions', async (req, res) => {
  // console.log(req);
  const positions = await Position.findAll();
  res.render('pages/accueil/crud-position', { positions, position: null });
});

router.post('/new-position', async (req, res) => {
  const { intitule } = req.body;
  const position = await Position.create({ intitule });
  console.log("ato"+intitule);
  // res.status(201).json(position);
  const positions = await Position.findAll();
  res.render('pages/accueil/crud-position', { positions, position: null });
});

router.get('/position/:id', async (req, res) => {
  console.log(req.params.id)
  const position = await Position.findById(req.params.id);
  // res.status(201).json(position);
  const positions = await Position.findAll();
  res.render('pages/accueil/crud-position', { position, positions });
});

// router.post('/', async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.create({ name, email });
//   res.status(201).json(user);
// });

export default router;

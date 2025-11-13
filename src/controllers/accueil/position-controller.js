import express from 'express';
import Position from '../../models/base/Position.js';
const router = express.Router();

router.get('/positions', async (req, res) => {
  try {
    const { intitule, etat, page = 1 } = req.query;
    const limit = 5;
    const currentPage = parseInt(page, 10);
    const offset = (currentPage - 1) * limit;

    let positions;
    let totalCount;

    if ((intitule && intitule.trim() !== '') || (etat && etat !== 'all')) {
      positions = await Position.findFiltered({ intitule, etat }, limit, offset);
      totalCount = await Position.countFiltered({ intitule, etat });
    } else {
      positions = await Position.findAll(limit, offset);
      totalCount = await Position.countAll();
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.render('pages/accueil/crud-position', {
      positions,
      search: { intitule, etat },
      pagination: { currentPage, totalPages }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du chargement des positions');
  }
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

router.delete('/positions/delete-all', async (req, res) => {
  const { ids } = req.body; // tableau d’IDs
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Aucun ID fourni" });
  }

  try {
    await Promise.all(ids.map(id => Position.delete(id)));
    res.status(200).json({ message: "Suppression réussie" });
  } catch (err) {
    console.error("Erreur suppression multiple :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


router.put('/positions/validate-all', async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Aucun ID fourni" });
  }

  try {
    await Promise.all(ids.map(id => Position.validate(id)));
    res.status(200).json({ message: "Suppression réussie" });
  } catch (err) {
    console.error("Erreur suppression multiple :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;

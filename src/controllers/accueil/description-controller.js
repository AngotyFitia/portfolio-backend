import express from 'express';
import Description from '../../models/base/Description.js';
import Position from '../../models/base/Position.js';
import multer from 'multer';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/description', async (req, res) => {
  const  descriptionRecente = await Description.getRecentDescription();
  if (descriptionRecente.photo) {
    descriptionRecente.photoBase64 = descriptionRecente.photo.toString('base64');
  }

  // if (descriptionRecente.photo && Buffer.isBuffer(descriptionRecente.photo)) {
  //   descriptionRecente.photoBase64 = descriptionRecente.photo.toString('base64');
  // }
  const positions = await Position.getPostionValidated();
  res.render('pages/accueil/crud-description', { descriptionRecente: descriptionRecente, positions: positions });
});

router.post('/new-description', upload.single('photo'), async (req, res) => {
  const idUtilisateur = 2;
  const { titre, introduction, idPosition } = req.body;
  const photo = req.file ? req.file.buffer : null;
  console.log(titre+introduction+idPosition);
  const nouvelleDescription = await Description.create(idUtilisateur, idPosition,{ titre, introduction, photo });
  // console.log("Nouvelle description créée:", nouvelleDescription);

  res.redirect('/description');
});


export default router;
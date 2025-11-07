import express from 'express';
import Utilisateur from '../../models/base/Utilisateur.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/login', { layout: false });
});

router.get('/utilisateurs', (req, res) => {
  const utilisateurConnecte = 
  res.render("pages/accueil/crud-utilisateur");
});

router.post('/auth-process', async (req, res) => {
  const { email, password } = req.body;
  var error = "Identifiant incorrect.";
  if(email ==''){
    error = "Veuillez insérez votre adresse email."
  } else if(password == ''){
    error = "Veuillez insérez votre mot de passe.";
  }
  console.log(email+""+password)
  const utilisateur = await Utilisateur.findById({ email, password });
  if(utilisateur!=null){
    res.render('pages/accueil/crud-utilisateur', {utilisateur});
  }else{
    res.render('pages/login', { layout: false , error: error});
  }
});

export default router;

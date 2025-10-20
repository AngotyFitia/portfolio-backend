import express from 'express';

const router = express.Router();

router.get('/utilisateurs', (req, res) => {
    res.render("pages/utilisateur");
  });

  export default router;
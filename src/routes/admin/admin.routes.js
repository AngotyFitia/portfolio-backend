import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exemple de route qui rend une vue EJS
router.get('/admin', (req, res) => {
  res.render("layouts/sidebar");
});

export default router;

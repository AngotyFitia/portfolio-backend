import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

// Import des controllers (backend)
import position from './src/controllers/accueil/position-controller.js';
import utilisateur from './src/controllers/accueil/utilisateur-controller.js';
import description from './src/controllers/accueil/description-controller.js';
import testbase from './src/routes/api/api.routes.js';


const app = express();
const port = process.env.PORT || 3000;

// Pour utiliser __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware global ---
app.use(cors({ origin: "https://portfolio-frontend-t1f1.vercel.app" }));


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // pour les formulaires
app.use(express.static(path.join(__dirname, "public")));

// --- Configuration du moteur de vues ---
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// --- services internes ---
app.use('/', [ position, utilisateur, description, testbase]);

// // --- Gestion des erreurs 404 ---
// app.use((req, res) => { 
//   res.status(404).render('pages/404', { layout: "layouts/main", title: "Page non trouvée" });
// });

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

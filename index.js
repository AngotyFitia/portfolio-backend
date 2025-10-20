import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import routes_position from './src/routes/admin/accueil/routes.position.js';
import routes_description from './src/routes/admin/accueil/routes.description.js';
import routes_utilisateur from './src/routes/admin/accueil/routes.utilisateur.js';
import routes_parcours from './src/routes/admin/parcours/routes.etablissement.js';
import routes_projets from './src/routes/admin/projets/routes.projets.js';
import accueil from './src/routes/admin/accueil/routes.utilisateur.js';
import projets from './src/routes/admin/projets.js';
import apiRoutes from './src/routes/api/api.routes.js';


const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "https://portfolio-frontend-t1f1.vercel.app" }));
app.use(express.json()); // Parser JSON

// Configuration du moteur de vues
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));



app.use('/', accueil);
app.use('/projets', projets);
app.use('/apidb', apiRoutes);
app.use('/testapi', routes_position);
app.use('/testapi', routes_utilisateur);
app.use('/testapi', routes_description);
app.use('/testapi', routes_parcours);
app.use('/testapi', routes_projets);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

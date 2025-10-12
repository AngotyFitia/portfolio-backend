import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import testRoutes from './src/routes/test/test.routes.js';
import apiRoutes from './src/routes/api/api.routes.js';
import adminRoutes from './src/routes/admin/admin.routes.js';


const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "https://portfolio-frontend-t1f1.vercel.app" }));
app.use(express.json()); // Parser JSON

// Configuration du moteur de vues(ok)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));



app.use('/test', testRoutes);
app.use('/apidb', apiRoutes);
app.use('/admin', adminRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

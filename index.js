import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import autorRoutes from './routes/AutorRoutes.js'; // rotas externas
import editoraRoutes from './routes/EditoraRoutes.js'; // rotas externas
import generoRoutes from './routes/GeneroRoutes.js'; // rotas externas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(autorRoutes)
app.use(generoRoutes)
app.use(editoraRoutes)
app.use(routes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;
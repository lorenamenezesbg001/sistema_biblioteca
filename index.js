import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import routes from './routes/route.js';
import autorRoutes from './routes/AutorRoutes.js';
import editoraRoutes from './routes/EditoraRoutes.js';
import generoRoutes from './routes/GeneroRoutes.js';
import livroRoutes from './routes/LivroRoutes.js';
import siteRoutes from './routes/SiteRoutes.js';

const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurações
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Rotas administrativas
app.use(autorRoutes);
app.use(generoRoutes);
app.use(editoraRoutes);
app.use(livroRoutes);

// Rotas do site
app.use(siteRoutes);

// Outras rotas
app.use(routes);

// Inicialização
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;

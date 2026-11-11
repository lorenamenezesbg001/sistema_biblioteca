import Livro from '../models/livro.js';
import Genero from '../models/genero.js';
import Autor from '../models/autor.js';
import Editora from '../models/editora.js';

export default class SiteController {

    constructor() {

        // Página inicial
        this.home = async (req, res) => {
            try {

                const livros = await Livro.find()
                    .populate('genero')
                    .populate('autor')
                    .populate('editora');

                res.render('site/index', { livros });

            } catch (error) {
                console.log(error);
                res.status(500).send('Erro ao carregar a página inicial.');
            }
        };

        // Login
        this.login = async (req, res) => {
            const resultado = "teste";

            res.render('site/conta', { livros: [] });
        };

        // Página do acervo
        this.acervo = async (req, res) => {
            try {

                const livros = await Livro.find()
                    .populate('genero')
                    .populate('autor')
                    .populate('editora');

                res.render('site/acervo', { livros });

            } catch (error) {
                console.log(error);
                res.status(500).send('Erro ao carregar o acervo.');
            }
        };

        // Página de autores
        this.autores = async (req, res) => {
            res.render('site/autores');
        };

        // Página de avaliações
        this.avaliacoes = async (req, res) => {
            res.render('site/avaliacoes');
        };

        // Detalhes do livro
        this.livroDetalhe = async (req, res) => {
            res.render('site/livro-detalhe');
        };

        // Página de livros
        this.livro = async (req, res) => {
            try {

                const livros = await Livro.find()
                    .populate('genero')
                    .populate('autor')
                    .populate('editora');

                res.render('site/livro/index', { livros });

            } catch (error) {
                console.log(error);
                res.status(500).send('Erro ao carregar os livros.');
            }
        };

    }
}
import Livro from '../models/livro.js';
import Genero from '../models/genero.js';
import Autor from '../models/autor.js';
import Editora from '../models/editora.js';

export default class SiteController {
  constructor() {

    this.home = async (req, res) => {
        res.render('site/index');
    };

    this.login = async (req, res) => {
        const resultado = "teste";
        res.render('site/index');
    };

    // Página do acervo
    this.acervo = async (req, res) => {
        const livros = await Livro.find().limit(4);
        res.render('site/acervo', {livros});
    };

    this.autores = async (req, res) => {
        res.render('site/autores');
    };
    this.avaliacoes = async (req, res) => {
        res.render('site/avaliacoes');
    };
    this.livroDetalhe = async (req, res) => {
        res.render('site/livro-detalhe');
    };
    this.livroDetalhe = async (req, res) => {
        res.render('site/livro-detalhe');
    };
    this.livro = async(req, res) => {
        const livros = await Livro.find().limit(4);
        res.render('site/livro/index', {livros});
    };
  }};
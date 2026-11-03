export default class SiteController {

    constructor() {

        this.home = async (req, res) => {
            res.render('site/index');
        };

        this.login = async (req, res) => {
            res.render('site/conta');
        };

        this.acervo = async (req, res) => {
            res.render('site/acervo');
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

    }
}

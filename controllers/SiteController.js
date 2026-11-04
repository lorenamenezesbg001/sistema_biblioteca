class SiteController {
    home(req, res) {
        res.render('site/index');
    }

    login(req, res) {
        res.render('site/conta'); 
    }

    acervo(req, res) {
        res.render('site/acervo');
    }

    autores(req, res) {
        res.render('site/autores');
    }

    avaliacoes(req, res) {
        res.render('site/avaliacoes');
    }

    livroDetalhe(req, res) {
        res.render('site/livro-detalhe');
    }
}

export default SiteController;
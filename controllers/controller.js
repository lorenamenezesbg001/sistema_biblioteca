export default class GeralController {
  constructor() {

    this.home = async (req, res) => {
        res.render('index');
    };

    this.teste = async (req, res) => {
        const resultado = "teste";
        res.render('index2', { teste: resultado });
    };

    this.formulario = async (req, res) => {
        res.render('index');
    };

    // Página do acervo
    this.acervo = async (req, res) => {
        res.render('site/acervo');
    };

}

}
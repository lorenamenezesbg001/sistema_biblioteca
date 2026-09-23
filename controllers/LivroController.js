// importar os Models
import Livro from '../models/livro.js';
import Genero from '../models/genero.js';
import Autor from '../models/autor.js';
import Editora from '../models/editora.js';

export default class LivroController {
  constructor(caminhoBase = 'livro/') {
    this.caminhoBase = caminhoBase;

    this.openAdd = async (req, res) => {
      // Buscar entidades relacionadas para permitir seleção
      const resultado = await Genero.find({});
      const resultado2 = await Autor.find({});
      const resultado3 = await Editora.find({});

      res.render(this.caminhoBase + 'add', {
        Generos: resultado,
        Autores: resultado2,
        Editoras: resultado3,
      });
    };

    this.add = async (req, res) => {
      let jgenero = null;
      let jautor = null;
      let jeditora = null;

      // Busca os objetos relacionamentos de forma independente
      if (req.body.genero) {
        jgenero = await Genero.findById(req.body.genero);
      }
      if (req.body.autor) {
        jautor = await Autor.findById(req.body.autor);
      }
      if (req.body.editora) {
        jeditora = await Editora.findById(req.body.editora);
      }

      // Trata envio da imagem
      let fotoEnviada = null;
      if (req.file) {
        fotoEnviada = req.file.buffer;
      }

      await Livro.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        anoPublicacao: req.body.anoPublicacao,
        fotoLivro: fotoEnviada,
        genero: jgenero,
        autor: jautor,
        editora: jeditora,
      });

      res.redirect('/' + this.caminhoBase + 'add');
    };

    this.list = async (req, res) => {
      const resultado = await Livro.find({}).populate('genero');
      res.render(this.caminhoBase + 'lst', { Livros: resultado });
    };

    this.find = async (req, res) => {
      const filtro = req.body.filtro;
      const resultado = await Livro.find({
        titulo: { $regex: filtro,$options: 'i' },
      }).lean();

      const Livros = resultado.map((livro) => ({
        ...livro,
        fotoLivro: livro.fotoLivro
          ? `data:image/png;base64,${Buffer.from(livro.fotoLivro).toString('base64')}`
          : null,
      }));

      res.render(this.caminhoBase + 'lst', { Livros });
    };

    this.openEdt = async (req, res) => {
      const id = req.params.id;
      const livro = await Livro.findById(id);
      res.render(this.caminhoBase + 'edt', { Livro: livro });
    };

    this.edt = async (req, res) => {
      await Livro.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/' + this.caminhoBase + 'lst');
    };

    this.del = async (req, res) => {
      await Livro.findByIdAndDelete(req.params.id);
      res.redirect('/' + this.caminhoBase + 'lst');
    };
  }
}
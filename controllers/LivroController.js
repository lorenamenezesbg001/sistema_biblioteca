//importar o Model
import Livro from '../models/livro.js'
import Genero from '../models/genero.js'
import Autor from '../models/autor.js'
import Editora from '../models/editora.js'

export default class LivroController{

    constructor(caminhoBase='livro/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
           
        // Buscar a entidade relacionada para permitir seleção
        const resultado = await Genero.find({});
         const resultado2 = await Autor.find({});
           const resultado3 = await Editora.find({});
        // Enviar na renderização a lista de gêneros
        res.render(caminhoBase + "add", {
        Generos: resultado,Autores: resultado2,  Editoras: resultado3})
        }

        this.add = async(req, res)=>{
            //cria o Livro
           let jgenero = null;
             // Se vier seleção de genero, busca o objeto
            if(req.body.genero != null) {
            jgenero = await Genero.findById(req.body.genero)
            let jautor = null;
             // Se vier seleção de autor, busca o objeto
            if(req.body.autor != null) {
            jautor = await Autor.findById(req.body.autor)
            let jeditora = null;
             // Se vier seleção de editora, busca o objeto
            if(req.body.editora != null) {
            jeditora = await Editora.findById(req.body.editora)
            }
            }
            let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = null
           }
 
            await Livro.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            anoPublicacao: req.body.anoPublicacao,
            fotoLivro: fotoEnviada,
            genero: jgenero,
            autor:jautor,
            editora: jeditora
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Livro.find({}).populate("genero")
            res.render(caminhoBase + 'lst', {Livros:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Livro.find({ titulo: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Livros:resultado})
        }

        this.find = async(req, res)=>{
                    const filtro = req.body.filtro;
                    const resultado = await Livro.find({
                        titulo: { $regex: filtro, $options: "i" }
                    }).lean();
                    const Livros = resultado.map((livro) => ({
                        ...livro,
                        fotoLivro: livro.fotoLivro
                            ? `data:image/png;base64,${Buffer.from(livro.fotoLivro).toString('base64')}`
                            : null
                    }));
                    res.render(caminhoBase + 'lst', { Livros });
                }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const livro = await Livro.findById(id) 
            console.log(livro)
            res.render(caminhoBase + "edt", 
                {Livro:livro})
        }


        this.edt = async(req, res)=>{
        await Livro.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Livro.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}}
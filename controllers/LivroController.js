//importar o Model
import Livro from '../models/livro.js'

export default class LivroController{

    constructor(caminhoBase='livro/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        // Buscar a entidade relacionada para permitir seleção
        const resultado = await Genero.find({});
        // Enviar na renderização a lista de gêneros
        res.render(caminhoBase + "add", {
        Generos: resultado})
        }
        this.add = async(req, res)=>{
            //cria o Livro
           let jgenero = null;
             // Se vier seleção de genero, busca o objeto
            if(req.body.genero != null) {
            jgenero = await Genero.findById(req.body.genero)
            }
 
            await Livro.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            anoPublicacao: req.body.anoPublicacao,
            genero: jgenero
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Livro.find({})
            res.render(caminhoBase + 'lst', {Livros:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Livro.find({ titulo: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Livros:resultado})
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
}
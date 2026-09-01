//importar o Model
import Autor from '../models/autor.js'

export default class AutorController{

    constructor(caminhoBase='autor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Aluno
           let fotoEnviada
           if(req.file!=null){
            console.log("Deu certo")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("Não deu certo")
            fotoEnviada = null
           }
            
            await Autor.create({
                nome: req.body.nome,
                localNascimento:req.body.localNascimento,
                fotoAutor:fotoEnviada
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Autor.find({})
            res.render(caminhoBase + 'lst', {Autores:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Autor.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Autores:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const autor = await Autor.findById(id) 
            console.log(autor)
            res.render(caminhoBase + "edt", 
                {Autor:autor})
        }


        this.edt = async(req, res)=>{
        await Autor.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Autor.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}
//importar o Model
import Editora from '../models/editora.js'

export default class editoraController{

    constructor(caminhoBase='editora/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o editora
           
            await Editora.create({
                nome: req.body.nome,
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Editora.find({})
            res.render(caminhoBase + 'lst', {Editoras:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Editora.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Editoras:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const editora = await Editora.findById(id) 
            console.log(editora)
            res.render(caminhoBase + "edt", 
                {Editora:editora})
        }


        this.edt = async(req, res)=>{
        await Editora.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Editora.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}
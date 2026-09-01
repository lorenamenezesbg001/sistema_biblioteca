//importar o Model
import Genero from '../models/genero.js'

export default class GeneroController{

    constructor(caminhoBase='genero/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Genero
           
            await Genero.create({
                nome: req.body.nome,
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Genero.find({})
            res.render(caminhoBase + 'lst', {Generos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Genero.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Generos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const genero = await Genero.findById(id) 
            console.log(genero)
            res.render(caminhoBase + "edt", 
                {Genero:genero})
        }


        this.edt = async(req, res)=>{
        await Genero.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Genero.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}
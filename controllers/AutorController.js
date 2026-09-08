//importar o Model
import Autor from '../models/autor.js'

export default class AutorController{

    constructor(caminhoBase='autor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            await Autor.create({
                nome: req.body.nome,
                localNascimento: req.body.localNascimento,
                fotoAutor: req.file ? req.file.buffer : null
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const Autores = await Autor.find({});
            res.render(caminhoBase + 'lst', { Autores });
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Autor.find({
                nome: { $regex: filtro, $options: "i" }
            }).lean();
            const Autores = resultado.map((autor) => ({
                ...autor,
                fotoAutor: autor.fotoAutor
                    ? `data:image/jpeg;base64,${Buffer.from(autor.fotoAutor).toString('base64')}`
                    : null
            }));
            res.render(caminhoBase + 'lst', { Autores });
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id;
            const autor = await Autor.findById(id).lean();
            if (autor && autor.fotoAutor) {
                autor.fotoAutor = `data:image/jpeg;base64,${Buffer.from(autor.fotoAutor).toString('base64')}`;
            }
            res.render(caminhoBase + "edt", { Autor: autor });
        }

        this.edt = async(req, res)=>{
            const dados = {
                nome: req.body.nome,
                localNascimento: req.body.localNascimento,
                ...(req.file ? { fotoAutor: req.file.buffer } : {})
            };
            await Autor.findByIdAndUpdate(req.params.id, dados);
            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Autor.findByIdAndDelete(req.params.id);
            res.redirect('/' + caminhoBase + 'lst');
        }

    }
}
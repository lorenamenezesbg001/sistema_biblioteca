import conexao from '../config/conexao.js'

const Autor = conexao.Schema({
    nome: {type:String, required:true},
    localNascimento:{type:String, required:true},
    fotoAutor:{type:Buffer}
})

const AutorSchema = conexao.Schema({
    nome:{type:String, required:true},
    fotoAutor:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
})

export default conexao.model('Autor',Autor)
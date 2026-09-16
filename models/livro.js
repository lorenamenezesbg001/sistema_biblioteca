import conexao from '../config/conexao.js'

const Livro = conexao.Schema({
 titulo: {
 type: String,
 required: true
 },
 descricao: {
 type: String,
 required: true
 },
 anoPublicacao: {
 type: Number,
 required: true
 },
 fotoLivro: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
            return true;
        }
    },
 genero: {
 type: conexao.Types.ObjectId, 
 ref: "Genero",
 required: false
 }
});

export default conexao.model('Livro',Livro)
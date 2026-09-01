import conexao from '../config/conexao.js'

const Editora = conexao.Schema({
    nome: {type:String, required:true}
})

export default conexao.model('Editora', Editora)
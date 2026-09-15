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
 genero: {
 type: conexao.Types.ObjectId, 
 ref: "Genero",
 required: false
 }
});
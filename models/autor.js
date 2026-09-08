import conexao from '../config/conexao.js'

const AutorSchema = new conexao.Schema({
    nome: { type: String, required: true },
    localNascimento: { type: String, required: true },
    fotoAutor: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
            return true;
        }
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

export default conexao.model('Autor', AutorSchema);
import mongoose from "mongoose";
const url = "mongodb+srv://aluno123:123@cluster0.w3v8dg9.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao
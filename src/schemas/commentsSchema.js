import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    nome: String,
    conteudo: String,
}, { collection: "posts" })

export default CommentsSchema;
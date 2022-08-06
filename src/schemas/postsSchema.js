import mongoose from "mongoose";
import CommentsSchema from "./commentsSchema.js";

const PostsSchema = new mongoose.Schema(
    {
        postId: Number,
        titulo: String,
        conteudo: String,
        comentarios: [CommentsSchema]
    }, { collection: 'posts' }
);

export default PostsSchema
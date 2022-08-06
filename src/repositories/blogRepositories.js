import { connect } from '../db/configMongodb.js';
import PostsSchema from "../schemas/postsSchema.js";

const createPosts = async (posts) => {
    try {
        const mongoose = await connect();
        const Posts = mongoose.model("Posts", PostsSchema);
        posts = new Posts(posts);
        await posts.save();
    } catch (error) {
        throw error;
    }
};

const getPosts = async () => {
    try {
        const mongoose = await connect();
        const Posts = mongoose.model("Posts", PostsSchema);
        const query = Posts.find({});
        return await query.exec();
    } catch (error) {
        throw error;
    }
};

const getPost = async (postId) => {
    try {
        const mongoose = await connect();
        const Posts = mongoose.model("Posts", PostsSchema);
        const query = Posts.findOne({ _id: postId });
        return await query.exec();
    } catch (error) {
        throw error;
    }
};


const createComments = async (comment, postId) => {
    try {
        const post = await getPost(postId);
        post.comentarios.push(comment);

        const mongoose = await connect();
        const Posts = mongoose.model("Posts", PostsSchema);
        await Posts.findOneAndUpdate({ _id: postId }, post);

    } catch (error) {
        throw error
    }
};


export default {
    createPosts,
    createComments,
    getPosts
}
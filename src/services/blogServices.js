import blogRepositories from '../repositories/blogRepositories.js';

const createPosts = async (posts) => {
    return await blogRepositories.createPosts(posts)
};

const createComments = async (comment, postId) => {
    return await blogRepositories.createComments(comment, postId)
};

const getPosts = async (ownerId) => {
    if (ownerId) {
        return await blogRepositories.getPostsByOwnerId(ownerId)
    }
    return await blogRepositories.getPosts();
};

export default {
    createPosts,
    createComments,
    getPosts
}
import blogServices from '../services/blogServices.js';

const createPosts = async (req, res, next) => {
    try {
        const posts = req.body;
        if (!posts.titulo || !posts.conteudo) {
            throw new Error("Titulo e conteudo são obrigatórios");
        };

        res.send(await blogServices.createPosts(posts));
        logger.info(`POST /servico - ${JSON.stringify(posts)}`)
    } catch (error) {
        next(error);
    }
};

const createComments = async (req, res, next) => {
    try {
        const posts = req.body;
        if (!posts.comments.nome || !posts.comments.conteudo) {
            throw new Error("Nome e conteudo são obrigatórios");
        };

        res.send(await blogServices.createComments(posts.comments, posts._id));
        logger.info(`POST /servico - ${JSON.stringify(posts)}`)
    } catch (error) {
        next(error);
    }
};


const getPosts = async (req, res, next) => {
    try {
        res.send(await blogServices.getPosts(req.query.proprietarioId));
        logger.info(`GET /servico`)
    } catch (error) {
        next(error);
    }
}

export default {
    createPosts,
    createComments,
    getPosts
}
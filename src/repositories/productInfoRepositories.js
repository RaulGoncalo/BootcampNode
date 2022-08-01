import { getClient } from "../db/configMongodb.js";

const creatProductInfo = async (productInfo) => {
    const client = getClient();
    try {
        await client.connect();
        await client.db('store').collection('productInfo').insertOne(productInfo);
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
};


const upadteProductInfo = async (productInfo) => {
    const client = getClient();
    try {
        await client.connect();
        await client.db("store").collection("productInfo").updateOne(
            {
                productId: productInfo.productId
            },
            {
                $set: { ...productInfo }
            }
        );
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
};


const getProductInfo = async (productId) => {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").findOne({ productId });
    } catch (error) {
        throw error
    } finally {
        await client.close();
    }
};


const getProductsInfo = async () => {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").find({}).toArray();
    } catch (error) {
        throw error
    } finally {
        await client.close();
    }
};

const createReview = async (review, productId) => {
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.push(review);
        await upadteProductInfo(productInfo);
    } catch (error) {
        throw error
    }
};


const deleteReview = async (productId, index) => {
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.splice(index, 1);
        await upadteProductInfo(productInfo);
    } catch (error) {
        throw error
    }
};

const deleteProductInfo = async (productId) => {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").deleteOne({ productId });
    } catch (error) {
        throw error
    } finally {
        await client.close();
    }
};

export default {
    creatProductInfo,
    upadteProductInfo,
    getProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}
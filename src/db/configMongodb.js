import mongodb from 'mongodb';

function getClient() {
    const uri = "mongodb+srv://root:admin@cluster0.gxqum.mongodb.net/?retryWrites=true&w=majority";
    return new mongodb.MongoClient(uri)
};

export { getClient }
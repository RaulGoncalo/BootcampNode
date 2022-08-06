import mongoose from 'mongoose';

const connect = async () => {
    const uri = "mongodb+srv://root:admin@cluster0.gxqum.mongodb.net/?retryWrites=true&w=majority";
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

export { connect }
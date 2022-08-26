import mongoose from "mongoose";

const connect = async () => {
  const uri =
    "mongodb+srv://root:ra100398ul@cluster0.gxqum.mongodb.net/bookstore?retryWrites=true&w=majority";
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { connect };

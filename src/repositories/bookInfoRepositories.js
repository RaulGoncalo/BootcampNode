import { connect } from "../db/configMongo.js";
import BookInfoSchema from "../schemas/bookInfoSchema.js";

const createBookInfo = async (bookInfo) => {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    bookInfo = new BookInfo(bookInfo);
    await bookInfo.save();
  } catch (error) {
    throw error;
  }
};

const updateBookInfo = async (bookInfo) => {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.findOneAndUpdate({ bookId: bookInfo.bookId }, bookInfo);
  } catch (error) {
    throw error;
  }
};

const readBookInfo = async (bookId) => {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    const query = BookInfo.findOne({ bookId: bookId });
    return await query.exec();
  } catch (error) {
    throw error;
  }
};

const readAllBookInfo = async () => {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    const query = BookInfo.find({});
    return await query.exec();
  } catch (error) {
    throw error;
  }
};

const deleteBookInfo = async (bookId) => {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.deleteOne({ bookId });
  } catch (error) {
    throw error;
  }
};

const createRating = async (rating, bookId) => {
  try {
    const bookInfo = await readBookInfo(bookId);
    bookInfo.rating.push(rating);
    await updateBookInfo(bookInfo);
  } catch (error) {
    throw error;
  }
};

const deleteRating = async (bookId, index) => {
  try {
    const bookInfo = await readBookInfo(bookId);
    bookInfo.rating.splice(index, 1);
    await updateBookInfo(bookInfo);
  } catch (error) {
    throw error;
  }
};

export default {
  createBookInfo,
  updateBookInfo,
  readBookInfo,
  readAllBookInfo,
  deleteBookInfo,
  createRating,
  deleteRating,
};

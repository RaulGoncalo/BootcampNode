import mongoose from "mongoose";
import RatingSchema from "./ratingSchema.js";

const BookInfoSchema = new mongoose.Schema(
  {
    bookId: Number,
    desc: String,
    pages: Number,
    publisher: String,
    rating: [RatingSchema],
  },
  { collection: "bookInfo", versionKey: false }
);

export default BookInfoSchema;

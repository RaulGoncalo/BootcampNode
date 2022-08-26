import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    name: String,
    note: Number,
    descRating: String,
  },
  { collection: "bookInfo", versionKey: false }
);

export default RatingSchema;

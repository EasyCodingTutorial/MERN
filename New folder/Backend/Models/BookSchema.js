import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    BookTitle: {
      type: String,
      required: true,
    },
    BookAuthor: {
      type: String,
      required: true,
    },
    BookIntro: {
      type: String,
      required: true,
    },
    BookDesc: {
      type: String,
      required: true,
    },
    BookImgUrl: {
      type: String,
      required: true,
    },
    BookPrice: {
      type: Number,
      required: true,
    },
    BookPublishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model("Book", BookSchema);

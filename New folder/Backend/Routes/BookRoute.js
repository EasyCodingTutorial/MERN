import express from "express";

import { BookModel } from "../Models/BookSchema.js";

const router = express.Router();

// To Save/CREATE
router.post("/", async (req, res) => {
  try {
    // Small Validation
    if (
      !req.body.BookTitle ||
      !req.body.BookAuthor ||
      !req.body.BookIntro ||
      !req.body.BookDesc ||
      !req.body.BookImgUrl ||
      !req.body.BookPrice ||
      !req.body.BookPublishYear
    ) {
      return res.status(400).send({
        message: "All Fields Are Required",
      });
    }

    //
    const NewBook = {
      BookTitle: req.body.BookTitle,
      BookAuthor: req.body.BookAuthor,
      BookIntro: req.body.BookIntro,
      BookDesc: req.body.BookDesc,
      BookImgUrl: req.body.BookImgUrl,
      BookPrice: req.body.BookPrice,
      BookPublishYear: req.body.BookPublishYear,
    };

    const response = await BookModel.create(NewBook);

    console.log("Response", response);
    return res.status(201).send({
      message: "Book Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

// GET ALL BOOK DATA
router.get("/", async (req, res) => {
  try {
    const Books = await BookModel.find({});

    return res.status(200).json({
      Total_Books_Available: Books.length,
      data: Books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

// GETTING SINGLE BOOK DATA
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      // message: error.message,
      message: "book Not Found",
    });
  }
});

// TO UPDATE THE BOOK DATA USING IT'S ID
router.put("/:id", async (req, res) => {
  try {
    // Small Validation
    if (
      !req.body.BookTitle ||
      !req.body.BookAuthor ||
      !req.body.BookIntro ||
      !req.body.BookDesc ||
      !req.body.BookImgUrl ||
      !req.body.BookPrice ||
      !req.body.BookPublishYear
    ) {
      return res.status(400).send({
        message: "All Fields Are Required",
      });
    }

    // First Getting The Id To Update The Book Data
    const { id } = req.params;

    const UpdateBook = await BookModel.findByIdAndUpdate(id, req.body);

    if (!UpdateBook) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
});

// TO DELETE THE BOOK DATA BY IT's ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    return res.status(200).json({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
});

export default router;

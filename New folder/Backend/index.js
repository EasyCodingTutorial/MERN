import express from "express";
import mongoose from "mongoose";

import { MONGODBURL, PORT } from "./config.js";
import router from "./Routes/BookRoute.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  //   console.log(req);
  return res.status(234).send("MERN APP START ");
});

app.use("/Books", router);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("Connected To DB");

    app.listen(PORT, () => {
      console.log(`Backend Start At Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

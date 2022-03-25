import express from "express";
import searchCategory from "../data/searchCategory.json";
export const searchRouter = express.Router();

searchRouter.get("/category", (req, res) => {
  res.json(searchCategory);
});

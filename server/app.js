import express from "express";
import path from "path";
import carouselData from "./data/carousel.json" assert { type: "json" };
// import { searchRouter } from "./routers/searchRouter.js";

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "client", "static")));
// app.use("/search", searchRouter);
app.get("/carousel", (req, res) => {
  res.json(carouselData);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}/`);
});

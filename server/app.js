import express from "express";
import path from "path";
import carouselData from "./data/carousel.json";

const app = express();
const __dirname = path.resolve();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "client", "static")));

app.get("/carousel", (req, res) => {
  res.json(carouselData);
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}/`);
});

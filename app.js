const express = require("express");
const cors = require("cors");

//Create Express App instance
const app = express();

app.use(cors());

//Data
let perfumes = require("./perfumes");

app.get("/perfumes", (req, res) => {
  res.json(perfumes);
});

app.post("/perfumes", (req, res) => {});

app.delete("/perfumes/:perfumeID", (req, res) => {
  const { perfumeID } = req.params;

  const foundPerfume = perfumes.find((perfume) => perfume.id === +perfumeID);
  if (foundPerfume) {
    perfumes = perfumes.filter((_perfume) => _perfume !== foundPerfume);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Perfume not found" });
  }

  perfumes = perfumes.filter((_perfume) => _perfume.id !== +perfumeID);
  res.status(204).end();
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

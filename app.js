const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const path = require("path");
const passport = require("passport");

const { Perfume } = require("./db/models");

// Routes
const perfumeRoutes = require("./routes/perfumes");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const { localStrategy } = require("./middleware/passport");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);

//Must be above user routes

//Routers
app.use("/perfumes", perfumeRoutes);
app.use("/shops", shopRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.status = 404;
  next(error);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    const perfumes = await Perfume.findAll();
    // perfumes.forEach((perfume) => console.log(perfume.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();

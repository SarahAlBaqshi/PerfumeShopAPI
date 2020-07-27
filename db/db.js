const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Munirali1",
  database: "PerfumeDB",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;

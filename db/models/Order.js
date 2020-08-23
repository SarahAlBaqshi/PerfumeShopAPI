const { Model } = require("sequelize");

const db = require("../db");

class Order extends Model {}

Order.init(
  {},
  {
    sequelize: db,
  }
);

module.exports = Order;

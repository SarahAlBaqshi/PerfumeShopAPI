const Perfume = require("./Perfume");
const Shop = require("./Shop");
const User = require("./User");
const Order = require("./Order");

// a shop has many perfumes
Shop.hasMany(Perfume, {
  as: "perfumes",
  foreignKey: "shopId",
  allowNull: false,
});

Perfume.belongsTo(Shop, { as: "shop" });

User.hasOne(Shop, { as: "shop", foreignKey: "userId" });

Shop.belongsTo(User, { as: "user", foreignKey: "userId" });

//one to many relationship between order and user
User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = {
  Perfume,
  Shop,
  User,
  Order,
};

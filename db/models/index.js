const Perfume = require("./Perfume");
const Shop = require("./Shop");
const User = require("./User");

// a shop has many perfumes
Shop.hasMany(Perfume, {
  as: "perfumes",
  foreignKey: "shopId",
  allowNull: false,
});

Perfume.belongsTo(Shop, { as: "shop" });

User.hasOne(Shop, { as: "shop", foreignKey: "userId" });

Shop.belongsTo(User, { as: "user" });

module.exports = {
  Perfume,
  Shop,
  User,
};

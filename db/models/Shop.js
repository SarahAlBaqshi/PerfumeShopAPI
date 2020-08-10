const { DataTypes, Model } = require("sequelize");
const db = require("..");
const SequelizeSlugify = require("sequelize-slugify");

class Shop extends Model {}

Shop.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Shop, {
  source: ["name"],
});

module.exports = Shop;

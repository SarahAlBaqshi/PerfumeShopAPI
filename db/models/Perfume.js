const { DataTypes, Model } = require("sequelize");
const db = require("..");

class Perfume extends Model {}

Perfume.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // slug: {
    //   type: DataTypes.STRING,
    //   unique: true,
    // },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
      validate: {
        min: {
          args: 5,
          msg: "Please enter a proper price (more than 5 KD)",
        },
      },
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

module.exports = Perfume;

//Data

const { Shop, Perfume } = require("../db/models");

exports.fetchShop = async (shopId) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const _shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Perfume,
          as: "perfumes",
          attributes: ["id"],
        },
      ],
    });
    res.json(_shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findOne({
      where: { userId: req.user.id },
    });

    if (foundShop) {
      const err = new Error("You already have a shop");
      err.status = 403;
      return next(err);
    }

    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopUpdate = async (req, res, next) => {
  //find the shop
  try {
    if (req.user.role === "admin" || req.user.id === req.shop.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.shop.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.shopDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.shop.userId) {
      await req.shop.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.perfumeCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
      req.body.shopId = req.shop.id;
      const newPerfume = await Perfume.create(req.body);
      res.status(201).json(newPerfume);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

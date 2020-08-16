//Data

const { Perfume, Shop } = require("../db/models");

exports.fetchPerfume = async (perfumeID) => {
  try {
    const perfume = await Perfume.findByPk(perfumeID, {
      include: {
        model: Shop,
        as: "shop",
        attributes: ["userId"],
      },
    });
    return perfume;
  } catch (error) {
    next(error);
  }
};

exports.perfumeList = async (req, res, next) => {
  try {
    const _perfumes = await Perfume.findAll({
      attributes: { exclude: ["shopId", "createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["name"],
      },
    });
    res.json(_perfumes);
  } catch (error) {
    next(error);
  }
};

exports.perfumeUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.perfume.shop.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.perfume.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorised");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.perfumeDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.perfume.shop.userId) {
      await req.perfume.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorised");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

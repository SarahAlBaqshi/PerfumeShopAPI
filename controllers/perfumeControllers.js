//Data

const { Perfume } = require("../db/models");

exports.fetchPerfume = async (perfumeID) => {
  try {
    const perfume = await Perfume.findByPk(perfumeID);
    return perfume;
  } catch (error) {
    next(error);
  }
};

exports.perfumeList = async (req, res, next) => {
  try {
    const _perfumes = await Perfume.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_perfumes);
  } catch (error) {
    next(error);
  }
};

exports.perfumeCreate = async (req, res, next) => {
  try {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
    const newPerfume = await Perfume.create(req.body);
    res.status(201).json(newPerfume);
  } catch (error) {
    next(error);
  }
};

exports.perfumeUpdate = async (req, res, next) => {
  //find the perfume
  try {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
    await req.perfume.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.perfumeDelete = async (req, res, next) => {
  try {
    await req.perfume.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

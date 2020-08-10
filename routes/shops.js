const express = require("express");

//Controllers
const {
  shopCreate,
  shopList,
  shopUpdate,
  shopDelete,
  fetchShop,
  perfumeCreate,
} = require("../controllers/shopControllers");

//Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop not found");
    err.status = 404;
    next(err);
  }
});

//Shop List
router.get("/", shopList);

//Shop Create
router.post("/", upload.single("image"), shopCreate);

//Shop Update
router.put("/:shopId", upload.single("image"), shopUpdate);

//Shop Delete
router.delete("/:shopId", shopDelete);

//Perfume Create
router.post("/:shopId/perfumes", upload.single("image"), perfumeCreate);

module.exports = router;
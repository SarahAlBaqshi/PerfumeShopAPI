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
const passport = require("passport");

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

//Shop Update
router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopUpdate
);

//Shop Delete
router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  shopDelete
);

//Perfume Create
router.post(
  "/:shopId/perfumes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  perfumeCreate
);

module.exports = router;

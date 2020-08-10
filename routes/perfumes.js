const express = require("express");

//Controllers
const {
  perfumeList,
  perfumeUpdate,
  perfumeDelete,
  fetchPerfume,
} = require("../controllers/perfumeControllers");

//Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("perfumeID", async (req, res, next, perfumeID) => {
  const perfume = await fetchPerfume(perfumeID, next);
  if (perfume) {
    req.perfume = perfume;
    next();
  } else {
    const err = new Error("Perfume not found");
    err.status = 404;
    next(err);
  }
});

//Perfume List
router.get("/", perfumeList);

//Perfume Update
router.put("/:perfumeID", upload.single("image"), perfumeUpdate);

//Perfume Delete
router.delete("/:perfumeID", perfumeDelete);

module.exports = router;

const router = require("express").Router();
const pokeController = require("../controllers/poke.controller");

module.exports = router;

router.get("/", pokeController.readAll);
router.get("/:id", pokeController.readById);
router.post("/", pokeController.create);
router.put("/:id", pokeController.update);
router.delete("/:id", pokeController.delete);
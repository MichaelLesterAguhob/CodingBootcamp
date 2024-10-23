const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game");
const { verify } = require("../auth");


router.post("/", verify, gameController.addGame)
router.get("/all", verify, gameController.getAllGames)
router.patch("/:gameId", verify, gameController.updateGameStatus)
router.delete("/:gameId", verify, gameController.deleteGame)

module.exports = router;
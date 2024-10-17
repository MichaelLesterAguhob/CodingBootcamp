const express = require("express");
const newsController = require("../controllers/news");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const router = express.Router();

router.post("/", verify, verifyAdmin, newsController.addNews);

router.get("/all", verify, verifyAdmin, newsController.getAllNews);

router.get("/", newsController.getAllActive);

router.get("/specific/:newsId", newsController.getNews);

router.patch("/:newsId", verify, verifyAdmin, newsController.updateNews);

router.patch("/:newsId/archive", verify, verifyAdmin, newsController.archiveNews);

router.patch("/:newsId/activate", verify, verifyAdmin, newsController.activateNews);

module.exports = router;
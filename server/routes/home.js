const express = require("express");
const router = express.Router();
const {
  allEvents,
  fetchEventById,
} = require("../controllers/homeController");

router.get("/", allEvents);
router.get("/:id", fetchEventById);

module.exports = router;

const express = require("express");

const {
  saveEvent,
  updateEventById,
  findEventById,
  findAllEvents,
  deleteEventById,
} = require("../controllers/eventsController");
const router = express.Router();

router.get("/", findAllEvents);
router.get("/:id", findEventById);
router.post("/create", saveEvent);
router.put("/", updateEventById);
router.delete("/", deleteEventById);

module.exports = router;

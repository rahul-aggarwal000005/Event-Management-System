const express = require("express");
const router = express.Router();
const {
  saveEvent,
  updateEventById,
  findEventById,
  findAllEvents,
  deleteEventById,
} = require("../controllers/eventsController");
const {
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middlewares/auth");

router.get("/", findAllEvents);
router.get("/:id", isAuthenticated, findEventById);
router.post("/create", isAdminAuthenticated, saveEvent);
router.put("/", isAdminAuthenticated, updateEventById);
router.delete("/", isAdminAuthenticated, deleteEventById);

module.exports = router;

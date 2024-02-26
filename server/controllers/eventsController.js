const Event = require("../models/Event");

// create new event
const saveEvent = async (req, res) => {
  try {
    const event = req.body;
    const newEvent = await Event.create(event);
    return res
      .status(200)
      .json({ message: "Event created successfully", eventId: newEvent._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find all events
const findAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find event by id
const findEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update event by id
const updateEventById = async (req, res) => {
  try {
    const event = req.body;
    const eventId = event._id;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event);
    return res.status(200).json({
      message: "Event updated successfully",
      eventId: updatedEvent._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete event by id
const deleteEventById = async (req, res) => {
  try {
    const eventId = req.body._id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      message: "Event Deleted successfully",
      eventId: deletedEvent._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveEvent,
  updateEventById,
  findEventById,
  findAllEvents,
  deleteEventById,
};

const events = [
  { id: 1, title: "Event 1", description: "Description for Event 1" },
  { id: 2, title: "Event 2", description: "Description for Event 2" },
  { id: 3, title: "Event 3", description: "Description for Event 3" },
];
const allEvents = (req, res) => {
  res.json(events);
};

const fetchEventById = (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
};

module.exports = {
  allEvents,
  fetchEventById,
};

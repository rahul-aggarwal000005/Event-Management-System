const express = require("express");
const app = express();
const cors = require("cors");
const loginRouter = require("./routes/login");
const allEvents = require("./routes/home");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/login", loginRouter);
app.use("/api/", allEvents);

app.listen(port, () => {
  console.log("Server running on port", port);
});

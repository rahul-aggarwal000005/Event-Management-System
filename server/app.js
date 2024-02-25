require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// routers
const loginRouter = require("./routes/login");
const eventsRouter = require("./routes/events");

// middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// routes
app.use("/api/login", loginRouter);
app.use("/api/events", eventsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

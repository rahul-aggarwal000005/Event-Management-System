require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

// routers
const userRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const { logRequest } = require("./middlewares/logging");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logRequest);

// Connect Database
connectDB();

// routes
app.use("/api/auth/", userRouter);
app.use("/api/events", eventsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

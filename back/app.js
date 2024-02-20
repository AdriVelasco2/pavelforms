const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
// app.use("/api", indexRoutes);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

module.exports = {app};

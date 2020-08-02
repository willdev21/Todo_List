const error = require("./middleware/error");
const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const express = require("express");
const app = express();
const todos = require("./routes/todos");

// for handling uncaught errors that
// take place outside the express framework

process.on("uncaughtException", (ex) => {
  console.log("Something failed: ", ex.message);
  process.exit(1);
});

// For handling async exceptions outside express
process.on("unhandledRejection", (ex) => {
  console.log("Something failed:", ex.message);
  process.exit(1);
});

mongoose
  .connect(config.get("database.connection"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to mongodb", err));

app.use(express.json());
app.use(helmet());
app.use("/api/todos", todos);

app.get("/", (req, res) => {
  res.send("My app");
});

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

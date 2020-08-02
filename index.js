const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const express = require("express");

mongoose
  .connect(config.get("database.connection"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to mongodb", err));

const todos = require("./routes/todos");
const app = express();

app.use(express.json());
app.use(helmet());
app.use("/api/todos", todos);

app.get("/", (req, res) => {
  res.send("My app");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

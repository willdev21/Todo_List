const config = require("config");
const helmet = require("helmet");
const express = require("express");

const todos = require("./routes/todos");
const app = express();

app.use(express.json());
app.use(helmet());
app.use("/api/todos", todos);

console.log(config.get("database.password"));

app.get("/", (req, res) => {
  res.send("My app");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const helmet = require("helmet");
const todos = require("../routes/todos");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.get("/", (req, res) => {
    res.send("My app");
  });
  app.use("/api/todos", todos);
  app.use(error);
};

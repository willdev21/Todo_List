const express = require("express");
const helmet = require("helmet");
const todos = require("../routes/todos");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", " http://localhost:3001"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    //Specify the allowed methods
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
  });

  app.get("/", (req, res) => {
    res.send("My app");
  });
  app.use("/api/todos", todos);
  app.use(error);
};

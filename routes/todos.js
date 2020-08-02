const express = require("express");
const { Todo, validate } = require("../models/todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo)
    return res
      .status(404)
      .send(`The todo with the given ID could not be found.`);

  res.send(todo);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({
    title: req.body.title,
    isComplete: req.body.isComplete,
  });

  todo = await todo.save();

  res.status(201).send(todo);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);

  if (!todo)
    return res
      .status(404)
      .send("The todo with the given ID could not be found.");

  todo.title = req.body.title;
  todo.isComplete = req.body.isComplete;

  const result = await todo.save();

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo)
    return res
      .status(404)
      .send("The todo with the given ID could not be found.");

  res.send(todo);
});

module.exports = router;

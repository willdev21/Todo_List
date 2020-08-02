const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();

const todos = [
  { id: "0", title: "Todo1", isComplete: false },
  { id: "1", title: "Todo2", isComplete: false },
  { id: "2", title: "Todo3", isComplete: false },
  { id: "3", title: "Todo4", isComplete: false },
];

router.get("/", (req, res) => {
  res.send(todos);
});

router.get("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if (!todo)
    return res
      .status(404)
      .send(`The todo with the given ID could not be found.`);

  res.send(todo);
});

router.post("/", (req, res) => {
  const { error } = validateTodo(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    isComplete: req.body.isComplete,
  };

  todos.push(todo);
  res.status(201).send(todo);
});

router.put("/:id", (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = todos.find((todo) => todo.id === req.params.id);

  if (!todo)
    return res
      .status(404)
      .send("The todo with the given ID could not be found.");

  todo.title = req.body.title;
  todo.isComplete = req.body.isComplete;

  res.send(todo);
});

router.delete("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if (!todo)
    return res
      .status(404)
      .send("The todo with the given ID could not be found.");

  todos.splice(parseInt(req.params.id), 1);
  res.send(todo);
});

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    isComplete: Joi.boolean().required().default(false),
  });

  return schema.validate(todo);
}

module.exports = router;

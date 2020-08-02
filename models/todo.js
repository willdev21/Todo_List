const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    isComplete: Joi.boolean().default(false),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;

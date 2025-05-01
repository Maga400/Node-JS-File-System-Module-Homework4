import { Todo } from "../models/todo.model.js";
import { writeLog } from "../utils/fsProcess.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
    writeLog(500, error.message, "/controller/getAllTodos");
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      writeLog(404, "Todo Not Found", "/controller/getTodoByid");
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
    writeLog(500, error.message, "/controller/getTodoById");
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = new Todo({
    title,
    description,
  });
  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
    writeLog(400, error.message, "/controller/createTodo");
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      writeLog(404, "Todo Not Found", "/controller/updateTodo");
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
    writeLog(400, error.message, "/controller/updateTodo");
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      writeLog(404, "Todo Not Found", "/controller/deleteTodo");
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    writeLog(500, error.message, "/controller/deleteTodo");
  }
};

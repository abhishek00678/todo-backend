import { Task } from "../models/tasks.js";

// create new rask api

export const newTask = async (req, res) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "task added successfully",
  });
};

// get loggedinn user task api

export const getMyTask = async (req, res) => {
  const userid = req.user._id;

  const task = await Task.find({ user: userid });

  res.status(201).json({
    success: true,
    task,
  });
};

// update user task api

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(201).json({
    success: true,
    message: "Task Updated Successfully",
  });
};

// delete user task api

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await task.deleteOne();

  res.status(201).json({
    success: true,
    message: "Task Deleted Successfully",
  });
};

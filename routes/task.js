import express from "express";
import { isAuth } from "../middelware/auth.js";
import {
  getMyTask,
  newTask,
  updateTask,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuth, newTask);
router.get("/mytask", isAuth, getMyTask);
router.put("/:id", isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);

export default router;

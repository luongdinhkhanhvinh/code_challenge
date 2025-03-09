import express from 'express';
import * as TaskController from '../controllers/taskController';

const router = express.Router();

// Create a new task
router.post('/', TaskController.createTask);

// Get all tasks with optional filters
router.get('/', TaskController.getAllTasks);

// Get a specific task by ID
router.get('/:id', TaskController.getTaskById);

// Update a task
router.put('/:id', TaskController.updateTask);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

export default router;

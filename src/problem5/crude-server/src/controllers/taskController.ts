import { Request, Response } from 'express';
import * as TaskModel from '../models/taskModel';
import { Task, TaskFilter } from '../types/task';

export async function createTask(req: Request, res: Response) {
  try {
    const task: Task = req.body;
    
    if (!task.title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTask = await TaskModel.createTask(task);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getAllTasks(req: Request, res: Response) {
  try {
    const filter: TaskFilter = {};
    
    if (req.query.status) {
      filter.status = req.query.status as 'pending' | 'in_progress' | 'completed';
    }
    
    if (req.query.search) {
      filter.search = req.query.search as string;
    }
    
    const tasks = await TaskModel.getAllTasks(filter);
    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const task = await TaskModel.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const updates: Partial<Task> = req.body;
    const updatedTask = await TaskModel.updateTask(id, updates);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const success = await TaskModel.deleteTask(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

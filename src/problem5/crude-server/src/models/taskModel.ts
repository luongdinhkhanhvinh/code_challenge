import { Task, TaskFilter } from '../types/task';

let tasks: Task[] = [];
let nextId = 1;

export async function createTask(task: Task): Promise<Task> {
  const now = new Date().toISOString();
  const newTask: Task = {
    ...task,
    id: nextId++,
    status: task.status || 'pending',
    createdAt: now,
    updatedAt: now
  };
  
  tasks.push(newTask);
  return { ...newTask };
}

export async function getAllTasks(filter: TaskFilter = {}): Promise<Task[]> {
  let filteredTasks = [...tasks];
  
  if (filter.status) {
    filteredTasks = filteredTasks.filter(task => task.status === filter.status);
  }
  
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchLower) || 
      (task.description && task.description.toLowerCase().includes(searchLower))
    );
  }
  
  return filteredTasks.sort((a, b) => {
    return new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime();
  });
}

export async function getTaskById(id: number): Promise<Task | null> {
  const task = tasks.find(t => t.id === id);
  return task ? { ...task } : null;
}

export async function updateTask(id: number, taskUpdate: Partial<Task>): Promise<Task | null> {
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const now = new Date().toISOString();
  const updatedTask: Task = {
    ...tasks[index],
    ...taskUpdate,
    updatedAt: now
  };
  
  tasks[index] = updatedTask;
  return { ...updatedTask };
}

export async function deleteTask(id: number): Promise<boolean> {
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  return tasks.length < initialLength;
}

(async () => {
  if (tasks.length === 0) {
    await createTask({
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the CRUD API project',
      status: 'pending'
    });
    
    await createTask({
      title: 'Implement authentication',
      description: 'Add JWT-based authentication to secure the API endpoints',
      status: 'in_progress'
    });
    
    await createTask({
      title: 'Set up initial project structure',
      description: 'Create the basic folder structure and configuration files',
      status: 'completed'
    });
  }
})();

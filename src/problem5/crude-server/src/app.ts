import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    name: 'Crude Server API',
    version: '1.0.0',
    endpoints: {
      tasks: {
        get: '/api/tasks - Get all tasks (with optional filters)',
        getById: '/api/tasks/:id - Get a specific task by ID',
        post: '/api/tasks - Create a new task',
        put: '/api/tasks/:id - Update an existing task',
        delete: '/api/tasks/:id - Delete a task'
      },
      health: '/health - Check API health'
    },
    filters: {
      status: 'Filter tasks by status (pending, in_progress, completed)',
      search: 'Search in task title and description'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.path} not found` });
});

// Error handling
app.use(errorHandler);

export default app;

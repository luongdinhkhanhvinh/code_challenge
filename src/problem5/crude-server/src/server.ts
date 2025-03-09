import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}`);
  console.log(`Health check endpoint: http://localhost:${PORT}/health`);
  console.log(`Tasks endpoint: http://localhost:${PORT}/api/tasks`);
});

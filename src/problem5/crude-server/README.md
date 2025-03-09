# Crude Server - Express.js CRUD API with TypeScript

This project demonstrates a simple CRUD (Create, Read, Update, Delete) API built with Express.js and TypeScript, using an in-memory data store for simplicity.

## Project Structure
```plaintext
crude-server/
├── src/
│   ├── controllers/
│   │   └── taskController.ts
│   ├── models/
│   │   └── taskModel.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── db/
│   │   └── database.ts
│   ├── types/
│   │   └── task.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints
```plaintext

 ---------------------------------------------------------------------------
| Method |      Endpoint           |                Description            |
|--------|-------------------------|---------------------------------------|
| GET    | /api/tasks              | Get all tasks (with optional filters) |
| GET    | /api/tasks/:id          | Get a specific task by ID             |
| POST   | /api/tasks              | Create a new task                     |
| PUT    | /api/tasks/:id          | Update an existing task               |
| DELETE | /api/tasks/:id          | Delete a task                         |
| GET    | /health                 | Health check endpoint                 |
| GET    | /                       | API documentation                     |
 ---------------------------------------------------------------------------
```

### Query Parameters for Filtering

- `status`: Filter tasks by status ('pending', 'in_progress', 'completed')
- `search`: Search in task title and description

## How to Run the Application

### Prerequisites

- Node.js (v14 or higher)
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Build the project:

```bash
npm run build
# or
yarn build
# or
pnpm build
```


3. Start the server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

For development with auto-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


4. The server will be running at [http://localhost:3000](http://localhost:3000)


## Example API Usage

### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project", "description": "Finish the CRUD API project", "status": "in_progress"}'
```

### Get All Tasks

```bash
curl http://localhost:3000/api/tasks
```

### Get Tasks with Filters

```bash
curl http://localhost:3000/api/tasks?status=pending&search=project
```

### Get a Specific Task

```bash
curl http://localhost:3000/api/tasks/1
```

### Update a Task

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Data Persistence

This implementation uses an in-memory data store for simplicity. In a production environment, you would want to replace this with a proper database like:

- SQLite (with better-sqlite3)
- PostgreSQL
- MongoDB
- MySQL


## Future Improvements

- Add authentication and authorization
- Implement pagination for the list endpoint
- Add more advanced filtering options
- Create a frontend client
- Add comprehensive test coverage
- Implement logging middleware
- Add Docker support for easier deployment

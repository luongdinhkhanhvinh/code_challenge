export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFilter {
  status?: 'pending' | 'in_progress' | 'completed';
  search?: string;
}

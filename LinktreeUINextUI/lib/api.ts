const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface TodoItem {
  id: number;
  title: string;
  memo: string;
  created: string;
  datecompleted: string | null;
  important: boolean;
  reminder_date: string | null;
  reminder_time: string | null;
}

export interface CreateTodoData {
  title: string;
  memo?: string;
  important?: boolean;
  reminder_date?: string;
  reminder_time?: string;
}

class ApiService {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return headers;
  }

  async getTodos(): Promise<TodoItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  }

  async getCompletedTodos(): Promise<TodoItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/completed`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch completed todos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching completed todos:', error);
      return [];
    }
  }

  async createTodo(data: CreateTodoData): Promise<TodoItem | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/create`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      return null;
    }
  }

  async deleteTodo(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  }

  async completeTodo(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}/complete`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({}),
      });

      return response.ok;
    } catch (error) {
      console.error('Error completing todo:', error);
      return false;
    }
  }

  async searchTodos(query: string): Promise<TodoItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/search/?search=${encodeURIComponent(query)}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to search todos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching todos:', error);
      return [];
    }
  }

  async login(username: string, password: string): Promise<{token: string; user: any} | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { token: data.token, user: data.user };
      }

      return null;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name?: string;
    last_name?: string;
  }): Promise<{token: string; user: any} | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error) || 'Registration failed');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { token: data.token, user: data.user };
      }

      return null;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<any | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const api = new ApiService();
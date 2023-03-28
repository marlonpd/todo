import axiosClient from './axios';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  is_completed: boolean;
  isManually?: boolean;
}

class ApiService {
  static getTodos = async (): Promise<Todo[]> => {
    return (await axiosClient.get('api/todos'))?.data;
  };
  static addTodo = async (todo: Todo): Promise<Todo[]> => {
    return (await axiosClient.post(`api/todo`, todo))?.data;
  };
  static updateTodo = async (todo: Todo): Promise<Todo[]> => {

    return (await axiosClient.post(`api/todo/update`, todo))?.data;
  };
  static deleteTodo = async (todo: Todo): Promise<Todo[]> => {
    return (await axiosClient.post(`api/todo/delete`, todo))?.data;
  };
}

export default ApiService;
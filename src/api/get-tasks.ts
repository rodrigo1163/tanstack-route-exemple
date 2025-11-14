import { api } from "../lib/axios";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
};

export type GetTasksResponse = {
  tasks: Task[];
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type UpdateTaskInput = {
  id: string;
  data: { text: string; completed?: boolean };
};

/**
 * Busca todas as tarefas.
 *
 * @function getTasks
 * @returns {Promise<TasksResponse>} Retorna um objeto contendo um array com todas as tarefas.
 * @throws {Error} Lança um erro se a busca das tarefas falhar.
 */
export async function getTasks(): Promise<GetTasksResponse> {
  const response = await api.get<Task[]>("/tasks");
  const result = {
    tasks: response.data,
  }
  return result;
}

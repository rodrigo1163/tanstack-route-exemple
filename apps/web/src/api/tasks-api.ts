import { AxiosError } from "axios";
import { api } from "../../lib/axios";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type CreateTaskInput = {
  text: string;
};

type CreateTaskResponse = {
  task: Task;
};

export type TasksResponse = {
  tasks: Task[];
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type UpdateTaskInput = {
  id: string;
  data: { text?: string; completed?: boolean };
};

/**
 * Cria uma nova tarefa.
 *
 * @function createTask
 * @param {CreateTaskInput} params - Parâmetros para criação da tarefa.
 * @param {string} params.text - O texto ou descrição da tarefa.
 * @returns {Promise<CreateTaskResponse>} Retorna um objeto contendo a tarefa criada.
 * @throws {Error} Lança um erro se a criação da tarefa falhar.
 */

export async function createTask({
  text,
}: CreateTaskInput): Promise<CreateTaskResponse> {
  try {
    const response = await api.post("/tasks", { text });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Erro ao criar tarefa");
    }
    throw new Error("Erro ao criar tarefa");
  }
}

/**
 * Deleta uma tarefa pelo ID.
 *
 * @function deleteTask
 * @param {string} id - O ID da tarefa a ser deletada.
 * @returns {Promise<any>} Retorna os dados da resposta da API.
 * @throws {Error} Lança um erro se a deleção da tarefa falhar.
 */

export async function deleteTask(id: string) {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Erro ao deletar tarefa");
    }
    throw new Error("Erro ao deletar tarefa");
  }
}

/**
 * Busca todas as tarefas.
 *
 * @function getTasks
 * @returns {Promise<TasksResponse>} Retorna um objeto contendo um array com todas as tarefas.
 * @throws {Error} Lança um erro se a busca das tarefas falhar.
 */
export async function getTasks(): Promise<TasksResponse> {
  try {
    const response = await api.get<TasksResponse>("/tasks");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Erro ao buscar tarefas");
    }
    throw new Error("Erro ao buscar tarefas");
  }
}

/**
 * Atualiza uma tarefa existente.
 *
 * @function updateTask
 * @param {string} id - O ID da tarefa a ser atualizada.
 * @param {Object} data - Dados para atualização da tarefa.
 * @param {string} [data.text] - O novo texto da tarefa (opcional).
 * @param {boolean} [data.completed] - O novo status de conclusão da tarefa (opcional).
 * @returns {Promise<any>} Retorna os dados da tarefa atualizada.
 * @throws {Error} Lança um erro se a atualização da tarefa falhar.
 */
export async function updateTask(
  id: string,
  data: { text?: string; completed?: boolean }
) {
  try {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Erro ao atualizar tarefa");
    }
    throw new Error("Erro ao atualizar tarefa");
  }
}

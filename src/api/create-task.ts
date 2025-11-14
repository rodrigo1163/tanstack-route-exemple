import { api } from "../lib/axios";
import type { Task } from "./get-tasks";
export type CreateTaskInput = {
  text: string;
};

export type CreateTaskResponse = {
  task: Task;
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
  const response = await api.post("/tasks", { text, completed: false });
  // json-server retorna a task diretamente, não dentro de um objeto { task: ... }
  // Normalizamos a resposta para o formato esperado
  const task = response.data;
  return { task };
}

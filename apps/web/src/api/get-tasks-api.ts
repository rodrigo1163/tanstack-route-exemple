import { AxiosError } from "axios";
import { api } from "../../lib/axios";

export async function getTasksApi() {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Erro ao buscar tarefas");
    }
    throw new Error("Erro ao buscar tarefas");
  }
}


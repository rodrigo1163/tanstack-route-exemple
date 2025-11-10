import { AxiosError } from "axios";
import { api } from "../../lib/axios";

export async function updateTaskApi(
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


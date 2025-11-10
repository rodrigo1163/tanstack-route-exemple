import { AxiosError } from "axios";
import { api } from "../../lib/axios";

export async function deleteTaskApi(id: string) {
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


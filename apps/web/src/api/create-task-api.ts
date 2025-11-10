import { AxiosError } from "axios";
import { api } from "../../lib/axios";

export async function createTaskApi(text: string) {
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

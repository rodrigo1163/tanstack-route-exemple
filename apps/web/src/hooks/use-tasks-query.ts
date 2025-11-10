import { useQuery } from "@tanstack/react-query";
import { getTasksApi } from "@/api/get-tasks-api";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TasksResponse = {
  tasks: Array<{
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }>;
};

export function useTasksQuery() {
  return useQuery<TasksResponse, Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await getTasksApi();
    },
  });
}

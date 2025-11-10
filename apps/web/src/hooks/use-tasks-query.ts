import { useQuery } from "@tanstack/react-query";
import { getTasks, type TasksResponse } from "@/api/tasks-api";

export type { Todo, TasksResponse } from "@/api/tasks-api";

export function useTasksQuery() {
  return useQuery<TasksResponse, Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await getTasks();
    },
  });
}

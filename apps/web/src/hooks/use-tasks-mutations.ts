import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  updateTask,
  deleteTask,
  type CreateTaskInput,
  type UpdateTaskInput,
  type TasksResponse,
} from "@/api/tasks-api";

export function useTasksMutations() {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      return await createTask({ text: input.text });
    },
    onSuccess: (data) => {
      queryClient.setQueryData<TasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: [data.task, ...oldData.tasks],
        };
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (input: UpdateTaskInput) => {
      return await updateTask(input.id, input.data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData<TasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: oldData.tasks.map((task) =>
            task.id === data.task.id ? data.task : task
          ),
        };
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTask(id);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<TasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: oldData.tasks.filter((task) => task.id !== id),
        };
      });
    },
  });

  return {
    createTask: createTaskMutation,
    updateTask: updateTaskMutation,
    deleteTask: deleteTaskMutation,
  };
}

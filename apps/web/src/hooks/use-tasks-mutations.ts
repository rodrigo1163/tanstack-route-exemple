import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskApi } from "@/api/create-task-api";
import { updateTaskApi } from "@/api/update-task-api";
import { deleteTaskApi } from "@/api/delete-task-api";

type CreateTaskInput = {
  text: string;
};

type UpdateTaskInput = {
  id: string;
  data: { text?: string; completed?: boolean };
};

type DeleteTaskInput = {
  id: string;
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

export function useTasksMutations() {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      return await createTaskApi(input.text);
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
      return await updateTaskApi(input.id, input.data);
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
    mutationFn: async (input: DeleteTaskInput) => {
      return await deleteTaskApi(input.id);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<TasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: oldData.tasks.filter((task) => task.id !== variables.id),
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

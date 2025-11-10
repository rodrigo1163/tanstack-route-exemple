import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTasksQuery } from "@/hooks/use-tasks-query";
import { TaskConfirmDeleteModal } from "@/pages/(private)/org/$slug/animals/-components/task-confirm-delete-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/create-task";
import { updateTask } from "@/api/update-task";
import type { CreateTaskInput } from "@/api/create-task";
import type { GetTasksResponse, Todo, UpdateTaskInput } from "@/api/get-tasks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";

export const Route = createFileRoute("/(private)/to-do")({
  component: RouteComponent,
});

type Filter = "all" | "active" | "completed";

const createTaskSchema = z.object({
  text: z.string().trim().min(1, "O texto da tarefa é obrigatório"),
});

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

function RouteComponent() {
  const [filter, setFilter] = useState<Filter>("all");
  const [taskToDelete, setTaskToDelete] = useState<Todo | null>(null);

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      text: "",
    },
  });

  const { data, isLoading, error } = useTasksQuery();

  const todos = useMemo<Todo[]>(() => {
    if (!data?.tasks) return [];
    return data.tasks.map((task) => ({
      id: task.id,
      text: task.text,
      completed: task.completed,
    }));
  }, [data]);

  const queryClient = useQueryClient();

  const { mutateAsync: createTaskFn, isPending: isCreatingTask } = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      return await createTask({ text: input.text });
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GetTasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: [data.task, ...oldData.tasks],
        };
      });
    },
  });

  const { mutateAsync: updateTaskFn } = useMutation({
    mutationFn: async (input: UpdateTaskInput) => {
      await updateTask(input.id, input.data);
      return input;
    },
    onSuccess: (input) => {
      queryClient.setQueryData<GetTasksResponse>(["tasks"], (oldData) => {
        if (!oldData) return oldData;
        return {
          tasks: oldData.tasks.map((task) =>
            task.id === input.id ? { ...task, ...input.data } : task
          ),
        };
      });
    },
  });

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleSubmit = async (data: CreateTaskFormValues) => {
    try {
      await createTaskFn({ text: data.text });
      form.reset();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleDeleteConfirm = () => {
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">To-Do List</CardTitle>
            <CardDescription>
              Organize suas tarefas e mantenha-se produtivo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex gap-2"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Adicione uma nova tarefa..."
                          className="flex-1"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              form.handleSubmit(handleSubmit)();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="default" disabled={isCreatingTask}>
                  <Plus className="size-4" />
                  {isCreatingTask ? "Adicionando..." : "Adicionar"}
                </Button>
              </form>
            </Form>

            {/* Filter Buttons */}
            {todos.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todas ({todos.length})
                </Button>
                <Button
                  variant={filter === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("active")}
                >
                  Ativas ({activeCount})
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completadas ({completedCount})
                </Button>
              </div>
            )}

            {/* Todo List */}
            <div className="space-y-2">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">Carregando tarefas...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">
                  <p className="text-lg">
                    Erro ao carregar tarefas: {error.message}
                  </p>
                </div>
              ) : filteredTodos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">
                    {todos.length === 0
                      ? "Nenhuma tarefa ainda. Adicione uma para começar!"
                      : filter === "active"
                      ? "Nenhuma tarefa ativa!"
                      : filter === "completed"
                      ? "Nenhuma tarefa completada ainda!"
                      : "Nenhuma tarefa encontrada."}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        updateTaskFn({
                          id: todo.id,
                          data: { completed: !todo.completed },
                        })
                      }
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={
                        todo.completed
                          ? "Marcar como não completa"
                          : "Marcar como completa"
                      }
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="size-5 text-primary" />
                      ) : (
                        <Circle className="size-5" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-base ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setTaskToDelete(todo)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      aria-label="Deletar tarefa"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {todos.length > 0 && (
              <div className="pt-4 border-t text-sm text-muted-foreground text-center">
                {activeCount === 0 ? (
                  <p className="text-primary font-medium">
                    🎉 Parabéns! Todas as tarefas foram concluídas!
                  </p>
                ) : (
                  <p>
                    {activeCount} tarefa{activeCount !== 1 ? "s" : ""} restante
                    {activeCount !== 1 ? "s" : ""} de {todos.length} total
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <TaskConfirmDeleteModal
        open={!!taskToDelete}
        onOpenChange={(open) => !open && setTaskToDelete(null)}
        taskToDelete={taskToDelete}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

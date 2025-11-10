import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
import { createTaskApi } from "@/api/create-task-api";
import { getTasksApi } from "@/api/get-tasks-api";
import { updateTaskApi } from "@/api/update-task-api";
import { deleteTaskApi } from "@/api/delete-task-api";

export const Route = createFileRoute("/_private/to-do")({
  component: RouteComponent,
});

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function RouteComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getTasksApi();
        setTodos(
          response.tasks.map(
            (task: { id: string; text: string; completed: boolean }) => ({
              id: task.id,
              text: task.text,
              completed: task.completed,
            })
          )
        );
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTodo = async () => {
    if (inputValue.trim() === "") return;

    try {
      const response = await createTaskApi(inputValue.trim());
      const newTodo: Todo = {
        id: response.task.id,
        text: response.task.text,
        completed: response.task.completed,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await updateTaskApi(id, {
        completed: !todo.completed,
      });
      setTodos(
        todos.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: response.task.completed,
              }
            : t
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTaskApi(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
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
            <div className="flex gap-2">
              <Input
                placeholder="Adicione uma nova tarefa..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo} size="default">
                <Plus className="size-4" />
                Adicionar
              </Button>
            </div>

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
                      onClick={() => toggleTodo(todo.id)}
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
                      onClick={() => deleteTodo(todo.id)}
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
    </div>
  );
}

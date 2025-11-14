import { Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Todo, UpdateTaskInput } from "@/api/get-tasks";
import { useState } from "react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

interface TodoListProps {
  filteredTodos: Todo[];
  error: Error | null;
  onToggleComplete: UseMutateAsyncFunction<UpdateTaskInput, Error, UpdateTaskInput, unknown>
  onDelete: (todo: Todo) => void;
}

export function TodoList({
  filteredTodos,
  error,
  onToggleComplete,
  onDelete,
}: TodoListProps) {
  const [loadingTodos, setLoadingTodos] = useState<Set<string>>(new Set());

  const handleToggleComplete = async (todo: Todo) => {
    setLoadingTodos((prev) => new Set(prev).add(todo.id));

    try {
      await onToggleComplete({
        id: todo.id,
        data: { completed: !todo.completed, text: todo.text },
      });
    } finally {
      setLoadingTodos((prev) => {
        const next = new Set(prev);
        next.delete(todo.id);
        return next;
      });
    }

  };

  return (
    <div className="space-y-2">
      {error ? (
        <div className="text-center py-12 text-destructive">
          <p className="text-lg">Erro ao carregar tarefas: {error.message}</p>
        </div>
      ) : (
        filteredTodos.map((todo) => {
          const isLoading = loadingTodos.has(todo.id);
          return (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
            >
              <button
                type="button"
                onClick={() => handleToggleComplete(todo)}
                disabled={isLoading}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={
                  todo.completed
                    ? "Marcar como não completa"
                    : "Marcar como completa"
                }
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : todo.completed ? (
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
              onClick={() => onDelete(todo)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
              aria-label="Deletar tarefa"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          );
        })
      )}
    </div>
  );
}

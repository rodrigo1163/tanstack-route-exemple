import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoListErrorProps {
  error: Error;
  onRetry?: () => void;
}

export function TodoListError({ error, onRetry }: TodoListErrorProps) {
  return (
    <div
      className="text-center py-12 text-destructive"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle
        className="size-12 mx-auto mb-4 text-destructive/70"
        aria-hidden="true"
      />
      <p className="text-lg font-medium mb-2">
        {error.message || "Erro ao carregar tarefas"}
      </p>
 
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-2"
          aria-label="Tentar novamente"
        >
          <RefreshCw className="size-4 mr-2" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
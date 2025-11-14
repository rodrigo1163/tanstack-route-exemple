import { ClipboardList } from "lucide-react";
import { getEmptyStateMessage } from "../_helpers";
import type { Filter } from "../page";

interface TodoListEmptyProps {
  todosCount?: number;
  filter?: Filter;
}

export function TodoListEmpty({
  todosCount = 0,
  filter = "all",
}: TodoListEmptyProps) {
  const message = getEmptyStateMessage(todosCount, filter);

  return (
    <div
      className="text-center py-12 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <ClipboardList
        className="size-12 mx-auto mb-4 text-muted-foreground/50"
        aria-hidden="true"
      />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
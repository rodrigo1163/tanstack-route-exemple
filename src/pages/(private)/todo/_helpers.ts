import type { Filter } from ".";

export function getEmptyStateMessage(todosCount: number, filter: Filter): string {
  if (todosCount === 0) {
    return "Nenhuma tarefa ainda. Adicione uma para começar!";
  }

  switch (filter) {
    case "active":
      return "Nenhuma tarefa ativa!";
    case "completed":
      return "Nenhuma tarefa completada ainda!";
    case "all":
    default:
      return "Nenhuma tarefa encontrada.";
  }
}


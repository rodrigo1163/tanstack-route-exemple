import { cn } from "@/lib/utils";

export function SplashScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-background z-50 transition-opacity duration-300",
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center space-x-4"></div>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="text-md text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

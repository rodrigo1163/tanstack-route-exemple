import { createFileRoute } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        margin: "100px",
      }}
    >
      <h1>Home</h1>
    </div>
  );
}

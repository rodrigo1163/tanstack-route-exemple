import { Link } from "@tanstack/react-router";

const activeProps = {
  style: {
    fontWeight: "bold",
  },
};
export function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      {/* Rotas Públicas */}
      <h3 style={{ marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
        Rotas Públicas
      </h3>
      <Link
        to="/sign-in"
        activeProps={activeProps}
        style={{ display: "block" }}
      >
        Login
      </Link>
      <Link
        to="/sign-up"
        activeProps={activeProps}
        style={{ display: "block" }}
      >
        Sign up
      </Link>
      <Link to="/forgot" activeProps={activeProps} style={{ display: "block" }}>
        Forgot
      </Link>
      <Link to="/" activeProps={activeProps} style={{ display: "block" }}>
        {({ isActive }) => (
          <>
            <span>Home</span> {isActive ? " (active)" : ""}
          </>
        )}
      </Link>

      {/* Rotas Privadas */}
      <h3
        style={{
          marginTop: "20px",
          marginBottom: "5px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Rotas Privadas
      </h3>
      <Link
        to="/dashboard"
        activeProps={activeProps}
        style={{ display: "block" }}
      >
        Dashboard
      </Link>
      <Link to="/search" activeProps={activeProps} style={{ display: "block" }}>
        Search
      </Link>
      <Link
        to="/settings"
        activeProps={activeProps}
        style={{ display: "block" }}
      >
        Settings
      </Link>
      <Link
        to="/org/$slug/animals"
        params={{ slug: "123" }}
        activeProps={activeProps}
        search={{ category: ["electronics", "clothing"] }}
        style={{ display: "block" }}
      >
        Org 123 Animals
      </Link>
    </div>
  );
}

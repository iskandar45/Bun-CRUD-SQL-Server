import { Hono } from "hono";
import users from "./routes/users";

const app = new Hono();

app.route("/users", users);

app.get("/", (c) => c.text("Hello from Bun + SQL Server CRUD!"));

Bun.serve({
  port: 3100,
  fetch: app.fetch,
});

console.log("🔥 Server running at http://localhost:3100");

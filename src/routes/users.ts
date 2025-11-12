import { Hono } from "hono";
import sql from "mssql";
import { pool } from "../db";

const users = new Hono();

users.get("/", async (c) => {
    const p = await pool;
    console.log(p)
  const result = await p.request().query("SELECT * FROM Users");
  return c.json(result.recordset);
});

users.post("/", async (c) => {
  const body = await c.req.json();
  const { name, email } = body;
  const p = await pool;
  await p.request()
    .input("name", sql.VarChar, name)
    .input("email", sql.VarChar, email)
    .query("INSERT INTO Users (name, email) VALUES (@name, @email)");
  return c.text("User added!");
});

users.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { name, email } = body;
  const p = await pool;
  await p.request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar, name)
    .input("email", sql.VarChar, email)
    .query("UPDATE Users SET name=@name, email=@email WHERE id=@id");
  return c.text("User updated!");
});

users.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const p = await pool;
  await p.request().input("id", sql.Int, id).query("DELETE FROM Users WHERE id=@id");
  return c.text("User deleted!");
});

export default users;

import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo{
  id: string,
  text:any
}

let todos:Todo[] = [];

router.get("/todo", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todo", async(ctx) => {
  const {text} = await ctx.request.body().value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: text
  };
  todos.push(newTodo);
  ctx.response.body = {message:"created todo",todo: newTodo}
});

router.put("/todo/:todoId", async (ctx) => {
  const todoId = ctx.params.todoId;
  const {text} = await ctx.request.body().value;
  const todoIndex: number = todos.findIndex(todo => {
    return todo.id === todoId;
  });
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: text };
    ctx.response.body = { message: "updated todo", todos: todos }
    return
  }
  ctx.response.body = { message: "todo not found!" };

});

router.delete("/todo/:todoId", (ctx) => {
  const todoId = ctx.params.todoId;
  todos = todos.filter(todo => {
    return todo.id !== todoId;
  });
  ctx.response.body = {message: "deleted successfully"}
});

export default router;
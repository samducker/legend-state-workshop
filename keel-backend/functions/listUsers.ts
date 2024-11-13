import { ListUsers, models } from "@teamkeel/sdk";

// To learn more about what you can do with custom functions, visit https://docs.keel.so/functions
export default ListUsers(async (ctx, inputs) => {
  // Note: In real world usage we'd have a User table and this would be much simpler.
  // For the purposes of the demo we just put a Text idUser on each todo so we have to iterate
  // all of them to build up a list of users.
  const todos = await models.todo.findMany(
    inputs.updatedAt
      ? { where: { updatedAt: { after: inputs.updatedAt } } }
      : undefined
  );
  const users = new Set(todos.map((todo) => todo.idUser));

  const maxUpdatedAt =
    todos.length > 0 ? todos[todos.length - 1].updatedAt : undefined;

  return {
    results: Array.from(users).map((user) => ({
      id: user,
      updatedAt: maxUpdatedAt,
    })),
  };
});

import { GetServerStatus, models } from "@teamkeel/sdk";

// To learn more about what you can do with custom functions, visit https://docs.keel.so/functions
export default GetServerStatus(async (ctx, inputs) => {
  // TODO: This should get something from the database but this works fine for a demo
  return {
    id: "serverStatus",
    minimumVersion: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

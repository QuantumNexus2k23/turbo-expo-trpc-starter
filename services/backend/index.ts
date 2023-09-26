import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { authRouter } from "./auth/router";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const app = express();

app.use(
  "/auth",
  trpcExpress.createExpressMiddleware({
    router: authRouter,
    createContext,
    onError: console.log,
  })
);

app.listen(5000, () => console.log("up and running on", "localhost:5000"));

export type { AuthRouter } from "./auth/router";

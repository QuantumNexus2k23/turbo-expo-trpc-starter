import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { jwtPayloadSchema, refreshSchema, credentialsSchema } from "./types";
import * as jwt from "jsonwebtoken";
import { generateTokens } from "./utils";

const t = initTRPC.create();
const prisma = new PrismaClient();

export const authRouter = t.router({
  refreshToken: t.procedure
    .input(refreshSchema.parse)
    .mutation(async ({ input: refreshToken }) => {
      const payload = jwt.verify(
        refreshToken,
        process.env["JWT_REFRESH_SECRET"] || ""
      );

      const parsedPayload = jwtPayloadSchema.parse(payload);

      return jwt.sign(
        {
          id: parsedPayload.id,
        },
        process.env["JWT_ACCESS_SECRET"] || "",
        { expiresIn: "1h" }
      );
    }),

  register: t.procedure
    .input(credentialsSchema.parse)
    .mutation(async ({ input }) => {
      console.log("entered");
      const count = await prisma.user.count({ where: { email: input.email } });

      if (count !== 0) throw new Error("Email taken");

      const hash = await bcrypt.hash(input.password, 10);

      const user = await prisma.user.create({
        data: { email: input.email, passwordHash: hash },
      });

      return generateTokens(user);
    }),

  login: t.procedure
    .input(credentialsSchema.parse)
    .mutation(async ({ input }) => {
      console.log("entered here");
      const user = await prisma.user.findFirstOrThrow({
        where: { email: input.email },
      });

      await bcrypt.compare(input.password, user.passwordHash);

      return generateTokens(user);
    }),
});

export type AuthRouter = typeof authRouter;

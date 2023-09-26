import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const generateTokens = (user: User) => {
  const accessToken = sign(
    {
      id: user.id,
    },
    process.env["JWT_ACCESS_SECRET"] || "",
    { expiresIn: "1h" }
  );

  const refreshToken = sign(
    {
      id: user.id,
    },
    process.env["JWT_REFRESH_SECRET"] || "",
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

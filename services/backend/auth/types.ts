import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export const refreshSchema = z.string();
export const jwtPayloadSchema = z.object({
  id: z.string(),
});
export const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type CredentialsData = z.infer<typeof credentialsSchema>;
export type RefreshData = z.infer<typeof refreshSchema>;
export type TokensData = z.infer<typeof tokensSchema>;

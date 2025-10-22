import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url({
    error: "A valid mongodb database url is required to use this application."
  }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BETTER_AUTH_SECRET: z.string({
    error: "A random hash to securely protect and encrypt credentials."
  }),
  RENDER_EXTERNAL_URL: z.url({ error: "Base URL of the server." }),
  PORT: z.coerce.number({
    error: "Specify a port number to run the application."
  }),
  GOOGLE_MAIL_ID: z.email({
    error: "Provide email of the owner gmail account."
  }),
  GOOGLE_CLIENT_ID: z.string({
    error: "Provide a google client id for OAuth2 services."
  }),
  GOOGLE_CLIENT_SECRET: z.string({
    error: "Provide a google client secret for OAuth2 services."
  }),
  GOOGLE_REFRESH_TOKEN: z.string({
    error: "Provide a google mail refresh token for OAuth2 services."
  }),
  GITHUB_CLIENT_ID: z.string({
    error: "Provide a google client id for OAuth2 services."
  }),
  GITHUB_CLIENT_SECRET: z.string({
    error: "Provide a google client secret for OAuth2 services."
  })
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.log(parsed.error);
  process.exit(1);
}

export const env = parsed.data;

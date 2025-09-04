import { z } from "zod";

const environmentVariableSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(["development", "production", "testing"]),
  PORT: z.coerce.number(),
});

const parse = environmentVariableSchema.safeParse(process.env);

if (!parse.success) {
  console.log(parse.error);
  process.exit(1);
}

export const envServer = parse.data;

export type TEnvironmentVariable = typeof envServer;

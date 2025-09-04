import database from "@/database/index.database";
import { accountSchema, sessionSchema, userSchema, verificationSchema } from "@/database/schema/index.schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      user: userSchema,
      session: sessionSchema,
      account: accountSchema,
      verification: verificationSchema,
    },
  }),
  telemetry: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
  },
});

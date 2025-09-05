import { envServer } from "@/constant/env.constant";
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
  socialProviders: {
    google: {
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    },
  },
  telemetry: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [envServer.FRONTEND_URL],
});

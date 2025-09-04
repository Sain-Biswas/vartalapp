import { defineConfig } from "drizzle-kit";

import { envServer } from "@/constant/env.constant";

export default defineConfig({
  out: "./.drizzle",
  schema: "./src/database/schema/index.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
});

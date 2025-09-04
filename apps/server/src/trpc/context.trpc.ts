import database from "@/database/index.database";
import { auth } from "@/lib/auth.lib";
import type { Context as HonoContext } from "hono";

export interface CreateTRPCContextOptions {
  context: HonoContext;
}

export async function createTRPCContext({ context }: CreateTRPCContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  return {
    session,
    database,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

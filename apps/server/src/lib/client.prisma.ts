import { env } from "@server/constant/env.constant";
import { PrismaClient } from "@server/generated/prisma/client";

export const prisma = new PrismaClient({ datasourceUrl: env.DATABASE_URL });

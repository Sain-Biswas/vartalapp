import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { envServer } from "@/constant/env.constant";
import * as schema from "@/database/schema/index.schema";

const pool = new Pool({
  connectionString: envServer.DATABASE_URL,
});

/**
 * Drizzle database connection client to perform queries on the postgres database.
 */
const database = drizzle({ client: pool, schema });

export default database;

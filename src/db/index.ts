import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";

let client: Client | null = null;
let dbInstance: LibSQLDatabase<typeof schema> | null = null;

function getDb() {
  if (!dbInstance) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url || url === "libsql://your-db.turso.io") {
      throw new Error("TURSO_DATABASE_URL is not configured");
    }
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
}

export const db = new Proxy({} as LibSQLDatabase<typeof schema>, {
  get(_target, prop: string | symbol) {
    const instance = getDb();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

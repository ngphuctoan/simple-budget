import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(Deno.env.get("DATABASE_URL")!);

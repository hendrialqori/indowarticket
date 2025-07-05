import { db } from "@/db";
import { users, type UserInsert } from "@/db/schemas/User";
import { eq } from "drizzle-orm";

export async function show(provider_id: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.provider_id, provider_id));
  return user;
}

export async function create(params: UserInsert) {
  await db.insert(users).values(params);
}

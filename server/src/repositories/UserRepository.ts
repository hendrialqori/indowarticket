import { db } from "@/db";
import { users } from "@/db/schemas/User";

export async function index() {
    const result = db.select().from(users);
    return result;
}

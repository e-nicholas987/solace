import db from "../../../db";
import { advocates } from "../../../db/schema";
import advocatesData from "@/db/seed/advocates.json";

export async function POST() {
  const records = await db.insert(advocates).values(advocatesData).returning();
  return Response.json({ advocates: records });
}

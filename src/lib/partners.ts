import { db } from "@/db";
import { partners } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getActivePartners() {
  return db
    .select()
    .from(partners)
    .where(eq(partners.active, true))
    .orderBy(asc(partners.position));
}

export async function getAllPartners() {
  return db.select().from(partners).orderBy(asc(partners.position));
}

export async function createPartner(data: {
  name: string;
  url?: string;
  logoUrl?: string;
  color?: string;
  position?: number;
}) {
  return db.insert(partners).values(data).returning();
}

export async function updatePartner(
  id: number,
  data: Partial<{
    name: string;
    url: string;
    logoUrl: string;
    color: string;
    position: number;
    active: boolean;
  }>
) {
  return db.update(partners).set(data).where(eq(partners.id, id)).returning();
}

export async function deletePartner(id: number) {
  return db.delete(partners).where(eq(partners.id, id));
}

export async function reorderPartners(
  items: { id: number; position: number }[]
) {
  for (const item of items) {
    await db
      .update(partners)
      .set({ position: item.position })
      .where(eq(partners.id, item.id));
  }
}

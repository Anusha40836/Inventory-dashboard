// lib/schema.ts
import { z } from "zod";
import type { CreateProduct } from "@/lib/types";


export const createProductSchema = z.object({
name: z.string().min(2, "name must be at least 2 characters"),
category: z.enum(["Medicine", "Electronics", "Grocery"]),
price: z.number().min(0.01, "price must be positive"),
stock: z.number().int().min(0, "stock cannot be negative"),
});


export type CreateProductInput = z.infer<typeof createProductSchema>;


// runtime validator utility
export function validateCreateProduct(payload: unknown): { ok: true; data: CreateProductInput } | { ok: false; error: any } {
const result = createProductSchema.safeParse(payload);
return result.success ? { ok: true, data: result.data } : { ok: false, error: result.error };
}
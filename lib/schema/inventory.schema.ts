import { z } from "zod";

// Inventory item schema
export const InventoryItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.enum(["medicine", "supplement", "equipment"]),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative(),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;

// Array schema for API validation
export const InventoryArraySchema = z.array(InventoryItemSchema);

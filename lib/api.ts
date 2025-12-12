// lib/api.ts
import type { ApiResponse } from "@/lib/types";


export async function fetchProducts(): Promise<ApiResponse<any>> {
const res = await fetch("/api/products");
if (!res.ok) throw new Error("Failed to fetch products");
return res.json();
}


export async function createProduct(payload: unknown) {
const res = await fetch("/api/products", {
method: "POST",
headers: { "content-type": "application/json" },
body: JSON.stringify(payload),
});


if (!res.ok) {
const json = await res.json().catch(() => ({}));
throw new Error(json?.error?.message || "Failed to create product");
}
return res.json();
}
// app/api/products/route.ts
import { NextResponse } from "next/server";
import type { Product } from "@/lib/types";
import { validateCreateProduct } from "@/lib/schema";


// NOTE: This file uses an in-memory array to keep the POC simple.
// In production, replace with a DB layer.


let PRODUCTS: Product[] = [
{ id: "1", name: "Paracetamol", category: "Medicine", price: 50, stock: 100 },
{ id: "2", name: "Laptop", category: "Electronics", price: 60000, stock: 20 },
{ id: "3", name: "Rice Bag", category: "Grocery", price: 1200, stock: 50 },
];


export async function GET() {
return NextResponse.json({ data: PRODUCTS });
}


export async function POST(req: Request) {
const body = await req.json().catch(() => ({}));
const validation = validateCreateProduct(body);
if (!validation.ok) {
return NextResponse.json({ error: validation.error.format() }, { status: 400 });
}


const item: Product = { id: String(Date.now()), ...validation.data };
PRODUCTS.push(item);
return NextResponse.json({ data: item });
}
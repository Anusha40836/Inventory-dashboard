import { NextRequest, NextResponse } from "next/server";
import { InventoryItem, InventoryArraySchema } from "@/lib/schema/inventory.schema";
import { z } from "zod";

let inventory: InventoryItem[] = [
  { id: "1", name: "Paracetamol", category: "medicine", price: 50, stock: 100 },
  { id: "2", name: "Amoxicillin", category: "medicine", price: 120, stock: 45 },
  { id: "3", name: "Protein Powder", category: "supplement", price: 200, stock: 30 },
  { id: "4", name: "Thermometer", category: "equipment", price: 300, stock: 15 },
];

export async function GET() {
  return NextResponse.json({ data: inventory });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item = InventoryArraySchema.element.parse(body);
    inventory.push(item);
    return NextResponse.json({ data: item });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const item = InventoryArraySchema.element.parse(body);
    inventory = inventory.map((i) => (i.id === item.id ? item : i));
    return NextResponse.json({ data: item });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    inventory = inventory.filter((i) => i.id !== id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

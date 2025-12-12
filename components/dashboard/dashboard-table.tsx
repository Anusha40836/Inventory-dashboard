"use client";

import React, { useMemo } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useFiltersStore,
} from "@/lib/store/filter.store";
import { InventoryItem } from "@/lib/schema/inventory.schema";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

// MOCK API: replace with /api/inventory in real project
// async function fetchInventory(): Promise<InventoryItem[]> {
//   // Simulate API call
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve([
//         { id: "1", name: "Paracetamol", category: "medicine", price: 50, stock: 100 },
//         { id: "2", name: "Amoxicillin", category: "medicine", price: 120, stock: 45 },
//         { id: "3", name: "Protein Powder", category: "supplement", price: 200, stock: 30 },
//         { id: "4", name: "Thermometer", category: "equipment", price: 300, stock: 15 },
//       ]);
//     }, 300)
//   );
// }

async function fetchInventory(): Promise<InventoryItem[]> {
  const res = await fetch("/api/inventory");
  const data = await res.json();
  return data.data; // matches { data: [...] } from API
}


export default function DashboardTable() {
  const { search, category } = useFiltersStore();

  // Fetch inventory
  const { data = [], isLoading } = useQuery<InventoryItem[]>({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  // Filter data based on global search/category
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [data, search, category]);

  // Define table columns
  const columns = useMemo<ColumnDef<InventoryItem>[]>(
    () => [
      { accessorKey: "name", header: "Product Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "stock", header: "Stock" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data.length) return <div>No data found</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 text-left bg-gray-100"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

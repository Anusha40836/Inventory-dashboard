// components/ProductsTable.tsx


import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { fetchProducts } from "@/lib/api";
import { useFilterStore, type FilterState } from "@/store/filters";
import type { Product } from "@/lib/types";


const columnHelper = createColumnHelper<Product>();


const columns = [
columnHelper.accessor("id", { header: "ID" }),
columnHelper.accessor("name", { header: "Name" }),
columnHelper.accessor("category", { header: "Category" }),
columnHelper.accessor("price", { header: "Price", cell: (info: any) => `₹${info.getValue()}` }),
columnHelper.accessor("stock", { header: "Stock" }),
];


export default function ProductsTable() {
const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts().then((r) => r.data) });
const globalFilter = useFilterStore((s: FilterState) => s.globalFilter);


const rows = useMemo(() => {
if (!data) return [] as Product[];
if (!globalFilter) return data as Product[];
const q = globalFilter.toLowerCase();
return (data as Product[]).filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
}, [data, globalFilter]);


const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });


if (isLoading) return <div>Loading...</div>;


return (
<div>
<table style={{ width: "100%", borderCollapse: "collapse" }}>
<thead>
{table.getHeaderGroups().map((hg: any) => (
<tr key={hg.id}>
{hg.headers.map((h: any) => (
<th key={h.id} style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>{h.isPlaceholder ? null : h.renderHeader()}</th>
))}
</tr>
))}
</thead>
<tbody>
{table.getRowModel().rows.map((row: any) => (
<tr key={row.id}>
{row.getVisibleCells().map((cell: any) => (
<td key={cell.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{cell.renderCell()}</td>
))}
</tr>
))}
</tbody>
</table>
</div>
);
}
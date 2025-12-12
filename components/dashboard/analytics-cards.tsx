"use client";

import React, { useMemo } from "react";
import { useFiltersStore } from "@/lib/store/filter.store";
import { useQuery } from "@tanstack/react-query";
import { InventoryItem } from "@/lib/schema/inventory.schema";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Fetch inventory from API
async function fetchInventory(): Promise<InventoryItem[]> {
  const res = await fetch("/api/inventory");
  const data = await res.json();
  return data.data;
}

export default function AnalyticsCards() {
  const { search, category } = useFiltersStore();

  const { data = [] } = useQuery<InventoryItem[]>({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [data, search, category]);

  // Prepare chart data: stock per category
  const chartData = useMemo(() => {
    const categories = ["medicine", "supplement", "equipment"];
    return categories.map((cat) => {
      const totalStock = filteredData
        .filter((item) => item.category === cat)
        .reduce((acc, curr) => acc + curr.stock, 0);
      return { category: cat, stock: totalStock };
    });
  }, [filteredData]);

  // Total inventory value
  const totalValue = filteredData.reduce((acc, curr) => acc + curr.price * curr.stock, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Items Card */}
      <div className="p-4 border rounded-md shadow-sm bg-white">
        <h3 className="text-sm text-gray-500">Total Items</h3>
        <p className="text-xl font-bold">{filteredData.length}</p>
      </div>

      {/* Total Inventory Value */}
      <div className="p-4 border rounded-md shadow-sm bg-white">
        <h3 className="text-sm text-gray-500">Total Inventory Value</h3>
        <p className="text-xl font-bold">₹ {totalValue}</p>
      </div>

      {/* Stock per Category Chart */}
      <div className="p-4 border rounded-md shadow-sm bg-white">
        <h3 className="text-sm text-gray-500 mb-2">Stock per Category</h3>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="stock">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.category === "medicine"
                      ? "#3b82f6"
                      : entry.category === "supplement"
                      ? "#10b981"
                      : "#f59e0b"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

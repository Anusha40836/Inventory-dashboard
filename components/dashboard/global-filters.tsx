"use client";

import { useFiltersStore } from "@/lib/store/filter.store";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function GlobalFilters() {
  const { search, category, setSearch, setCategory } = useFiltersStore();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Search Filter */}
      <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="all">All Categories</option>
  <option value="medicine">Medicine</option>
  <option value="supplement">Supplements</option>
  <option value="equipment">Equipment</option>
</select>

    </div>
  );
}

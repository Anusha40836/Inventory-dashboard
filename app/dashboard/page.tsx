"use client";

import AnalyticsCards from "@/components/dashboard/analytics-cards";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { GlobalFilters } from "@/components/dashboard/global-filters";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Inventory Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage your inventory efficiently with filters, analytics, and tables.
        </p>
      </header>

      {/* Global Filters */}
      <section className="mb-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <GlobalFilters />
        </div>
      </section>

      {/* Analytics Cards */}
      <section className="mb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCards />
        </div>
      </section>

      {/* Dashboard Table */}
      <section>
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <DashboardTable />
        </div>
      </section>
    </main>
  );
}

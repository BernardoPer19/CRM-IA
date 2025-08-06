"use client";

import { useState } from "react";
import FilterProducts from "./FilterProducts";
import GridViewProducts from "./GridViewProducts";
import TableViewProducts from "./TableViewProducts";

export default function ProductsClient({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FilterProducts
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {viewMode === "grid" ? (
        <GridViewProducts products={filteredProducts} />
      ) : (
        <TableViewProducts products={filteredProducts} />
      )}
    </div>
  );
}

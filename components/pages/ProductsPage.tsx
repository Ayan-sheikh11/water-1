"use client";
import { useState } from "react";
import { useApp } from "../AppProvider";
import { ProductCard } from "../ProductCard";
export function ProductsPage() {
  const { products } = useApp();
  const [q, setQ] = useState("");
  return (
    <main className="page">
      <div className="container">
        <div className="pageHero">
          <span className="eyebrow">SHOP WATER</span>
          <h1>Fresh water, your way.</h1>
          <p>Single bottles, multiple bottles and seller-set volume offers.</p>
          <input
            className="search"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="productGrid">
          {products
            .filter((p) =>
              (p.name + p.size).toLowerCase().includes(q.toLowerCase()),
            )
            .map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
        </div>
      </div>
    </main>
  );
}

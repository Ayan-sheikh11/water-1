"use client";
import { ShoppingCart, Tag } from "lucide-react";
import { Product } from "@/lib/types";
import { useApp } from "./AppProvider";
export function ProductCard({ p }: { p: Product }) {
  const { cart, setCart, toast } = useApp();
  const add = () => {
    const old = cart.find((x) => x.id === p.id);
    if (p.stock <= 0) return toast("Out of stock");
    if (old && old.qty >= p.stock) return toast(`Only ${p.stock} available`);
    setCart(
      old
        ? cart.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
        : [...cart, { id: p.id, qty: 1 }],
    );
    toast("Added to cart");
  };
  return (
    <article className="productCard">
      <div className="productImage">
        <span>{p.image}</span>
        <small>{p.size}</small>
        {p.stock <= p.lowStock && <i>Only {p.stock} left</i>}
      </div>
      <div className="cardBody">
        <div className="cardTitle">
          <div>
            <h3>{p.name}</h3>
            <p>{p.size} • Fresh sealed</p>
          </div>
          <strong>Rs {p.price}</strong>
        </div>
        <div className="offer">
          <Tag /> Buy {p.offerQty}+ for Rs {p.offerPrice}
        </div>
        <div className="stock">
          ● {p.stock > 0 ? `${p.stock} available` : "Out of stock"}
        </div>
        <button className="primary full" disabled={!p.stock} onClick={add}>
          <ShoppingCart />
          {p.stock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </article>
  );
}

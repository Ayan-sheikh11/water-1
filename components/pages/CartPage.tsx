"use client";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useApp } from "../AppProvider";
export function CartPage() {
  const { cart, setCart, products } = useApp();
  const items = cart.map((i) => ({
    ...i,
    p: products.find((p) => p.id === i.id)!,
  }));
  const total = items.reduce((s, i) => s + i.qty * i.p.price, 0);
  return (
    <main className="page">
      <div className="container narrow">
        <div className="pageTitle">
          <span className="eyebrow">YOUR CART</span>
          <h1>Ready to check out?</h1>
        </div>
        {!items.length ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link className="primary" href="/products">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="cartLayout">
            <div className="cartList">
              {items.map((i) => (
                <div className="cartItem" key={i.id}>
                  <span className="mini">{i.p.image}</span>
                  <div>
                    <b>{i.p.name}</b>
                    <small>
                      {i.p.size} • {i.p.stock} in stock
                    </small>
                    <div className="qty">
                      <button
                        onClick={() =>
                          setCart(
                            cart
                              .map((x) =>
                                x.id === i.id
                                  ? { ...x, qty: Math.max(0, x.qty - 1) }
                                  : x,
                              )
                              .filter((x) => x.qty),
                          )
                        }
                      >
                        <Minus />
                      </button>
                      {i.qty}
                      <button
                        disabled={i.qty >= i.p.stock}
                        onClick={() =>
                          setCart(
                            cart.map((x) =>
                              x.id === i.id ? { ...x, qty: x.qty + 1 } : x,
                            ),
                          )
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <b>Rs {i.qty * i.p.price}</b>
                  <button
                    onClick={() => setCart(cart.filter((x) => x.id !== i.id))}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
            <aside className="summary">
              <h3>Summary</h3>
              <div>
                Water <b>Rs {total}</b>
              </div>
              <hr />
              <div className="total">
                Total <b>Rs {total}</b>
              </div>
              <Link className="primary full" href="/checkout">
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

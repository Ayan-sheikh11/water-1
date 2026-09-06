"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { useApp } from "../AppProvider";
import { zones } from "@/data/seed";
export function CheckoutPage() {
  const {
    cart,
    products,
    setCart,
    setOrders,
    orders,
    toast,
    session,
    updateProfile,
  } = useApp();
  const router = useRouter();
  const [f, setF] = useState({
    name: "",
    phone: "",
    address: "",
    zone: "Clifton",
  });

  useEffect(() => {
    // protect checkout: require session
    if (!session) {
      router.push("/login?returnTo=/checkout");
      return;
    }
    // load saved profile from localStorage users
    try {
      const u = JSON.parse(localStorage.getItem("pf_users") || "[]");
      const me = u.find((x: any) => x.email === session.email);
      if (me)
        setF({
          name: me.name || "",
          phone: me.phone || "",
          address: me.address || "",
          zone: me.zone || "Clifton",
        });
    } catch {}
  }, [session, router]);
  const items = cart.map((i) => ({
    ...i,
    p: products.find((p) => p.id === i.id)!,
  }));
  const sub = items.reduce((s, i) => s + i.qty * i.p.price, 0),
    delivery = zones[f.zone as keyof typeof zones] || 120;
  const submit = (e: any) => {
    e.preventDefault();
    if (!session) return toast("Please sign in to place order");
    if (!items.length) return toast("Cart is empty");
    if (!f.name || !f.phone || !f.address)
      return toast("Complete delivery details");
    const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
    const o = {
      id,
      customer: { ...f, email: session.email, id: session.email },
      items: items.map((i) => ({
        productId: i.p.id,
        name: i.p.name,
        size: i.p.size,
        qty: i.qty,
        price: i.p.price,
      })),
      subtotal: sub,
      delivery,
      total: sub + delivery,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setOrders([o, ...orders]);
    setCart([]);
    // persist profile to users
    try {
      updateProfile(session.email, {
        name: f.name,
        phone: f.phone,
        address: f.address,
        zone: f.zone,
      });
    } catch {}
    router.push("/track-order?order=" + id);
    toast("Order placed successfully");
  };
  return (
    <main className="page">
      <div className="container narrow">
        <div className="pageTitle">
          <span className="eyebrow">CHECKOUT</span>
          <h1>Delivery details</h1>
        </div>
        <form className="checkoutGrid" onSubmit={submit}>
          <div className="formCard">
            <label>
              Full name
              <input
                required
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
              />
            </label>
            <label>
              Phone number
              <input
                required
                value={f.phone}
                onChange={(e) => setF({ ...f, phone: e.target.value })}
              />
            </label>
            <label>
              Karachi area
              <select
                value={f.zone}
                onChange={(e) => setF({ ...f, zone: e.target.value })}
              >
                {Object.keys(zones).map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </label>
            <label>
              Delivery address
              <textarea
                required
                value={f.address}
                onChange={(e) => setF({ ...f, address: e.target.value })}
              />
            </label>
            <div className="mapBox">
              <MapPin />
              <b>Delivery map area</b>
              <small>Only Karachi citizens • {f.zone}</small>
            </div>
            <button className="primary full big">
              Place order • Rs {sub + delivery}
            </button>
          </div>
          <aside className="summary">
            <h3>Your order</h3>
            {items.map((i) => (
              <div key={i.id}>
                {i.p.name} × {i.qty}
                <b>Rs {i.qty * i.p.price}</b>
              </div>
            ))}
            <hr />
            <div>
              Delivery <b>Rs {delivery}</b>
            </div>
            <div className="total">
              Total <b>Rs {sub + delivery}</b>
            </div>
            <p className="notice">
              <Phone /> Phone is required so the delivery rider can contact you.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "../AppProvider";
import { Check, MapPin, Phone } from "lucide-react";
import { statuses } from "@/lib/types";

export function OrderDetail() {
  const { session, orders } = useApp();
  const params = useParams();
  const router = useRouter();
  const id = (params as any)?.id;
  const [o, setO] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    const ord = orders.find((x) => x.id === id) || null;
    if (!ord) return setO(null);
    if (!session || ord.customer.email !== session.email) {
      setO({ unauthorized: true });
      return;
    }
    setO(ord);
  }, [id, orders, session]);

  if (!id) return null;
  if (o && o.unauthorized)
    return (
      <main className="page">
        <div className="container narrow">
          <div className="errorBox">
            You are not authorized to view this order.
          </div>
        </div>
      </main>
    );
  if (!o)
    return (
      <main className="page">
        <div className="container narrow">Order not found.</div>
      </main>
    );

  return (
    <main className="page">
      <div className="container narrow">
        <span className="eyebrow">ORDER CONFIRMATION</span>
        <h1>{o.id}</h1>
        <div className="adminCard">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>{o.customer.name}</p>
              <p>{o.customer.address}</p>
              <p>{o.customer.zone}</p>
            </div>
            <div>
              <b>Rs {o.total}</b>
              <p>{o.status}</p>
            </div>
          </div>
          <hr />
          <h3>Items</h3>
          {o.items.map((i: any) => (
            <div
              key={i.productId}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {i.name} • {i.size} × {i.qty}
              </div>
              <div>Rs {i.price * i.qty}</div>
            </div>
          ))}
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Delivery</div>
            <div>Rs {o.delivery}</div>
          </div>
          <div className="total" style={{ marginTop: 12 }}>
            Total <b>Rs {o.total}</b>
          </div>
        </div>
      </div>
    </main>
  );
}

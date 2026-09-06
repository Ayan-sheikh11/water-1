"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, MapPin, Phone, AlertTriangle } from "lucide-react";
import { useApp } from "../AppProvider";
import { statuses } from "@/lib/types";
export function TrackPage() {
  const sp = useSearchParams();
  const { orders } = useApp();
  const [id, setId] = useState(sp?.get("order") || "");
  const [o, setO] = useState<any>(null);
  return (
    <main className="page">
      <div className="container narrow">
        <div className="pageHero">
          <span className="eyebrow">ORDER TRACKING</span>
          <h1>Where is my water?</h1>
          <div className="trackInput">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="PF-123456"
            />
            <button
              className="primary"
              onClick={() =>
                setO(
                  orders.find((x) => x.id.toLowerCase() === id.toLowerCase()) ||
                    null,
                )
              }
            >
              Track
            </button>
          </div>
        </div>
        {o ? (
          <div className="trackCard">
            <div className="trackTop">
              <div>
                <span className="eyebrow">{o.id}</span>
                <h2>{o.status}</h2>
                <p>
                  {o.customer.name} • {o.customer.zone}, Karachi
                </p>
              </div>
              <strong>Rs {o.total}</strong>
            </div>
            <div className="timeline">
              {statuses.map((s, i) => (
                <div
                  className={
                    statuses.indexOf(o.status) >= i
                      ? "timeStep active"
                      : "timeStep"
                  }
                  key={s}
                >
                  <span>
                    {statuses.indexOf(o.status) >= i ? <Check /> : i + 1}
                  </span>
                  <b>{s}</b>
                </div>
              ))}
            </div>
            <div className="details">
              <span>
                <MapPin />
                {o.customer.address}
              </span>
              <span>
                <Phone />
                {o.customer.phone}
              </span>
            </div>
          </div>
        ) : (
          id && (
            <div className="errorBox">
              <AlertTriangle /> Order not found.
            </div>
          )
        )}
      </div>
    </main>
  );
}

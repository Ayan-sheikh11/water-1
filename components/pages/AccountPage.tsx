"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../AppProvider";

export function AccountPage() {
  const { session, orders } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (!session) router.replace("/login?returnTo=/account");
  }, [session, router]);
  if (!session) return null;
  return (
    <main className="page">
      <div className="container narrow">
        <span className="eyebrow">MY ACCOUNT</span>
        <h1>Hello, {session?.name || "Customer"}</h1>
        <div className="adminCard">
          <h3>Order history</h3>
          {orders.filter((o) => o.customer.email === session?.email).length ? (
            orders
              .filter((o) => o.customer.email === session?.email)
              .map((o) => (
                <div className="orderRow" key={o.id}>
                  <span>
                    <b>{o.id}</b>
                    <small>{o.status}</small>
                  </span>
                  <b>Rs {o.total}</b>
                  <Link href={`/account/orders/${o.id}`}>View</Link>
                </div>
              ))
          ) : (
            <p>
              No orders yet. <Link href="/products">Shop now</Link>
            </p>
          )}
          <p style={{ marginTop: 12 }}>
            <Link href="/account/profile">Edit profile</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

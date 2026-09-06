"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Package,
  Settings,
  Tag,
  Trash2,
  Plus,
  LogOut,
} from "lucide-react";
import { useApp } from "../AppProvider";
import { statuses } from "@/lib/types";
export function AdminPage() {
  const {
    session,
    products,
    setProducts,
    orders,
    setOrders,
    toast,
    setSession,
  } = useApp();
  const r = useRouter();
  const [tab, setTab] = useState("overview");
  const [del, setDel] = useState<string | null>(null);
  useEffect(() => {
    if (session?.role !== "admin") r.replace("/admin/login");
  }, [session, r]);
  if (session?.role !== "admin") return null;
  const delivered = orders.filter((o) => o.status === "Delivered");
  const revenue = delivered.reduce((s, o) => s + o.total, 0);
  const cost = delivered.reduce(
    (s, o) =>
      s +
      o.items.reduce(
        (a, i) =>
          a + (products.find((p) => p.id === i.productId)?.cost || 0) * i.qty,
        0,
      ),
    0,
  );
  const profit = revenue - cost;
  const sold = orders.reduce(
    (s, o) => s + o.items.reduce((a, i) => a + i.qty, 0),
    0,
  );
  return (
    <main className="adminPage">
      <aside className="adminSide">
        <b>
          PUREFLOW<small>SELLER CENTER</small>
        </b>
        {[
          ["overview", "Overview", BarChart3],
          ["products", "Products & offers", Tag],
          ["stock", "Stock", Boxes],
          ["orders", "Orders & history", Package],
          ["settings", "Delivery settings", Settings],
        ].map(([k, t, I]: any) => (
          <button
            className={tab === k ? "sel" : ""}
            onClick={() => setTab(k)}
            key={k}
          >
            <I />
            {t}
          </button>
        ))}
        <button
          className="logout"
          onClick={() => {
            setSession(null);
            r.push("/admin/login");
          }}
        >
          <LogOut /> Logout
        </button>
      </aside>
      <section className="adminMain">
        <div className="adminTop">
          <div>
            <span className="eyebrow">SELLER DASHBOARD</span>
            <h1>
              {tab === "overview"
                ? "Good morning, Seller."
                : tab === "products"
                  ? "Products & offers"
                  : tab === "stock"
                    ? "Inventory control"
                    : tab === "orders"
                      ? "Orders & history"
                      : "Delivery settings"}
            </h1>
          </div>
          <span className="live">● Saved locally</span>
        </div>
        {tab === "overview" && (
          <>
            <div className="kpis">
              <K title="Orders" v={orders.length} />
              <K title="Bottles sold" v={sold} />
              <K title="Revenue" v={`Rs ${revenue}`} />
              <K title="Profit" v={`Rs ${profit}`} />
            </div>
            <div className="adminCard">
              <h3>7-day sales chart</h3>
              <div className="chart">
                {[42, 58, 48, 76, 62, 88, 70].map((v, i) => (
                  <div className="bar" style={{ height: v + "%" }} key={i}>
                    <small>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab === "products" && (
          <ProductSettings
            products={products}
            setProducts={setProducts}
            toast={toast}
          />
        )}{" "}
        {tab === "stock" && (
          <Stock products={products} setProducts={setProducts} toast={toast} />
        )}{" "}
        {tab === "orders" && (
          <div className="adminCard">
            <h3>Orders & sales history</h3>
            {orders.map((o) => (
              <div className="orderRow" key={o.id}>
                <span>
                  <b>{o.id}</b>
                  <small>
                    {o.customer.name} • {o.customer.phone}
                  </small>
                </span>
                <b>Rs {o.total}</b>
                <select
                  value={o.status}
                  onChange={(e) =>
                    setOrders(
                      orders.map((x) =>
                        x.id === o.id ? { ...x, status: e.target.value } : x,
                      ),
                    )
                  }
                >
                  {statuses.concat(["Cancelled"]).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button className="deleteText" onClick={() => setDel(o.id)}>
                  <Trash2 /> Delete
                </button>
              </div>
            ))}
            {!orders.length && <p>No orders yet.</p>}
          </div>
        )}
        {tab === "settings" && (
          <div className="adminCard">
            <h3>Delivery charges</h3>
            <p>
              Seller can configure Karachi area pricing here before connecting a
              database.
            </p>
            <div className="zoneGrid">
              {[
                "Clifton",
                "DHA",
                "Gulshan",
                "Gulberg",
                "NorthNazimabad",
                "PECHS",
              ].map((z) => (
                <label key={z}>
                  {z}
                  <input
                    type="number"
                    defaultValue={z === "Clifton" ? 80 : 100}
                  />
                </label>
              ))}
            </div>
            <button
              className="primary"
              onClick={() => toast("Delivery settings saved")}
            >
              Save settings
            </button>
          </div>
        )}
        {del && (
          <div className="modalBack">
            <div className="modal">
              <h2>Delete history entry?</h2>
              <p>This order will be permanently removed from this browser.</p>
              <button className="outline" onClick={() => setDel(null)}>
                No, keep it
              </button>
              <button
                className="danger"
                onClick={() => {
                  setOrders(orders.filter((o) => o.id !== del));
                  setDel(null);
                  toast("History deleted");
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
function K({ title, v }: { title: string; v: any }) {
  return (
    <div className="kpi">
      <small>{title}</small>
      <strong>{v}</strong>
    </div>
  );
}
function ProductSettings({ products, setProducts, toast }: any) {
  return (
    <div className="adminCard">
      {products.map((p: any) => (
        <div className="settingsRow" key={p.id}>
          <span>
            {p.image}
            <b>{p.name}</b>
          </span>
          <label>
            Price
            <input
              type="number"
              value={p.price}
              onChange={(e) =>
                setProducts(
                  products.map((x: any) =>
                    x.id === p.id ? { ...x, price: +e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          <label>
            Offer qty
            <input
              type="number"
              value={p.offerQty}
              onChange={(e) =>
                setProducts(
                  products.map((x: any) =>
                    x.id === p.id ? { ...x, offerQty: +e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          <label>
            Offer price
            <input
              type="number"
              value={p.offerPrice}
              onChange={(e) =>
                setProducts(
                  products.map((x: any) =>
                    x.id === p.id ? { ...x, offerPrice: +e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          <label>
            Alert at
            <input
              type="number"
              value={p.lowStock}
              onChange={(e) =>
                setProducts(
                  products.map((x: any) =>
                    x.id === p.id ? { ...x, lowStock: +e.target.value } : x,
                  ),
                )
              }
            />
          </label>
        </div>
      ))}
      <button
        className="primary"
        onClick={() => toast("Product settings saved")}
      >
        Save changes
      </button>
    </div>
  );
}
function Stock({ products, setProducts, toast }: any) {
  return (
    <div className="adminCard">
      <div className="alertBanner">
        <AlertTriangle /> Red alert appears at seller-set threshold.
      </div>
      {products.map((p: any) => (
        <div className="stockRow" key={p.id}>
          <span>
            {p.image}
            <b>{p.name}</b>
          </span>
          <strong className={p.stock <= p.lowStock ? "dangerText" : ""}>
            {p.stock} bottles
          </strong>
          <input type="number" min="1" placeholder="New stock" />
          <button
            className="primary small"
            onClick={(e: any) => {
              const n = Number(e.currentTarget.previousSibling.value);
              if (n) {
                setProducts(
                  products.map((x: any) =>
                    x.id === p.id ? { ...x, stock: x.stock + n } : x,
                  ),
                );
                toast(`+${n} bottles added`);
              }
            }}
          >
            <Plus /> Add stock
          </button>
        </div>
      ))}
    </div>
  );
}

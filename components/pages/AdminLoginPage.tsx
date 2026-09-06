"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../AppProvider";
export function AdminLoginPage() {
  const { setSession, toast } = useApp();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const r = useRouter();
  return (
    <main className="authPage">
      <div>
        <span className="eyebrow">SELLER CONTROL</span>
        <h1>Run the business from one dashboard.</h1>
        <p>
          Protected seller area for products, stock, offers, orders and profit.
        </p>
      </div>
      <form
        className="authCard"
        onSubmit={(e) => {
          e.preventDefault();
          if (email === "admin@pureflow.local" && password === "admin123") {
            setSession({ email, role: "admin", name: "Seller" });
            r.push("/admin");
          } else toast("Demo login: admin@pureflow.local / admin123");
        }}
      >
        <h2>Admin login</h2>
        <input
          required
          placeholder="admin@pureflow.local"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type={showPassword ? "text" : "password"}
          placeholder="admin123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            id="showAdminPwd"
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showAdminPwd">Show password</label>
        </div>
        <button className="primary full big">Open dashboard</button>
        <small>Demo: admin@pureflow.local / admin123</small>
      </form>
    </main>
  );
}

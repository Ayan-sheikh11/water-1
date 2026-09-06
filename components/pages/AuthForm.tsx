"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "../AppProvider";

async function sha256Hex(text: string) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { setSession, toast, registerUser, loginUser } = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = params?.get("returnTo") || undefined;
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [name, setName] = useState(""),
    [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const go = async (e: any) => {
    e.preventDefault();
    if (password.length < 6) return toast("Password must be 6+ characters");
    if (mode === "signup" && password !== confirm)
      return toast("Passwords do not match");
    const hash = await sha256Hex(password);
    if (mode === "signup") {
      const r = registerUser({
        email,
        name: name || "Customer",
        phone,
        passwordHash: hash,
      });
      if (!r.success) return toast(r.message || "Registration failed");
      setSession({ email, name: name || "Customer", role: "customer" });
      toast("Account created");
      // redirect to returnTo if provided (checkout flow), else account
      router.push(returnTo || "/account");
    } else {
      const r = loginUser(email, hash);
      if (!r.success) return toast("Invalid credentials");
      setSession({ email, name: r.user?.name || "Customer", role: "customer" });
      toast("Welcome back");
      router.push(returnTo || "/");
    }
  };
  return (
    <main className="authPage">
      <div>
        <span className="eyebrow">PUREFLOW ACCOUNT</span>
        <h1>{mode === "login" ? "Welcome back." : "Create your account."}</h1>
        <p>Manage orders and keep your delivery details close.</p>
      </div>
      <form className="authCard" onSubmit={go}>
        <h2>{mode === "login" ? "Sign in" : "Sign up"}</h2>
        {mode === "signup" && (
          <>
            <label>
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
          </>
        )}
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            minLength={6}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            id="showPwd"
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showPwd">Show password</label>
        </div>
        {mode === "signup" && (
          <label>
            Confirm password
            <input
              required
              minLength={6}
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        )}
        <button className="primary full big">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
        <p>
          {mode === "login" ? (
            <>
              New here? <Link href="/signup">Create an account</Link>
            </>
          ) : (
            <>
              Already registered? <Link href="/login">Sign in</Link>
            </>
          )}
        </p>
        <Link className="adminLink" href="/admin/login">
          Seller / Admin login
        </Link>
      </form>
    </main>
  );
}

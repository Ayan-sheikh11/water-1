"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { products as seed } from "@/data/seed";
import { CartItem, Order, Product } from "@/lib/types";

type Session = {
  email: string;
  name?: string;
  role: "customer" | "admin" | string;
} | null;
type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  zone?: string;
  address?: string;
  passwordHash: string;
};
type Ctx = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  session: Session;
  setSession: (s: Session) => void;
  toast: (m: string) => void;
  registerUser: (u: {
    email: string;
    name: string;
    phone?: string;
    passwordHash: string;
  }) => { success: boolean; message?: string };
  loginUser: (
    email: string,
    passwordHash: string,
  ) => { success: boolean; user?: User };
  updateProfile: (email: string, data: Partial<User>) => void;
};

const C = createContext<Ctx | null>(null);

function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()}`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed),
    [cart, setCart] = useState<CartItem[]>([]),
    [orders, setOrders] = useState<Order[]>([]),
    [session, setSessionState] = useState<Session>(null),
    [msg, setMsg] = useState("");

  // users store (demo/local only)
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      const g = (k: string, d: any) => {
        const x = localStorage.getItem(k);
        return x ? JSON.parse(x) : d;
      };
      setProducts(g("pf_products", seed));
      setCart(g("pf_cart", []));
      setOrders(g("pf_orders", []));
      setSessionState(g("pf_session", null));
      setUsers(g("pf_users", []));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pf_products", JSON.stringify(products));
      localStorage.setItem("pf_cart", JSON.stringify(cart));
      localStorage.setItem("pf_orders", JSON.stringify(orders));
      localStorage.setItem("pf_session", JSON.stringify(session));
      localStorage.setItem("pf_users", JSON.stringify(users));
    }
  }, [products, cart, orders, session, users]);

  const toast = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2200);
  };

  const setSession = (s: Session) => {
    setSessionState(s);
    if (s) {
      // store a non-sensitive session cookie for middleware checks
      try {
        setCookie(
          "pf_session",
          JSON.stringify({ email: s.email, role: s.role, name: s.name }),
        );
      } catch {}
    } else {
      deleteCookie("pf_session");
    }
  };

  const registerUser = (u: {
    email: string;
    name: string;
    phone?: string;
    passwordHash: string;
  }) => {
    if (users.find((x) => x.email === u.email))
      return { success: false, message: "Email already registered" };
    const newUser: User = {
      id: u.email,
      email: u.email,
      name: u.name,
      phone: u.phone || "",
      passwordHash: u.passwordHash,
    };
    setUsers([newUser, ...users]);
    return { success: true };
  };

  const loginUser = (email: string, passwordHash: string) => {
    const user = users.find(
      (u) => u.email === email && u.passwordHash === passwordHash,
    );
    if (!user) return { success: false };
    return { success: true, user };
  };

  const updateProfile = (email: string, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, ...data } : u)),
    );
    // if updating current session name/profile, reflect in session
    if (session?.email === email)
      setSession({ ...session, name: data.name || session.name });
  };

  return (
    <C.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        orders,
        setOrders,
        session,
        setSession,
        toast,
        registerUser,
        loginUser,
        updateProfile,
      }}
    >
      {children}
      {msg && <div className="toast">✓ {msg}</div>}
    </C.Provider>
  );
}
export const useApp = () => useContext(C)!;

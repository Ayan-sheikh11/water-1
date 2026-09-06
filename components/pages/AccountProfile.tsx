"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../AppProvider";
import { zones } from "@/data/seed";

export function AccountProfile() {
  const { session, toast, updateProfile } = useApp();
  const router = useRouter();
  const [f, setF] = useState({
    name: "",
    phone: "",
    address: "",
    zone: "Clifton",
  });

  useEffect(() => {
    if (!session) return router.replace("/login?returnTo=/account/profile");
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

  const save = (e: any) => {
    e.preventDefault();
    if (!session) return toast("Please sign in");
    updateProfile(session.email, {
      name: f.name,
      phone: f.phone,
      address: f.address,
      zone: f.zone,
    });
    toast("Profile saved");
  };

  if (!session) return null;
  return (
    <main className="page">
      <div className="container narrow">
        <span className="eyebrow">MY PROFILE</span>
        <h1>Profile</h1>
        <form className="formCard" onSubmit={save}>
          <label>
            Full name
            <input
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              required
            />
          </label>
          <label>
            Phone
            <input
              value={f.phone}
              onChange={(e) => setF({ ...f, phone: e.target.value })}
              required
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
              value={f.address}
              onChange={(e) => setF({ ...f, address: e.target.value })}
              required
            />
          </label>
          <button className="primary">Save profile</button>
        </form>
      </div>
    </main>
  );
}

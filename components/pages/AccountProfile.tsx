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
    if (!session) {
      router.replace("/login?returnTo=/account/profile");
      return;
    }

    try {
      const rawUsers = JSON.parse(localStorage.getItem("pf_users") || "[]");
      const me = rawUsers.find(
        (x: any) => String(x.email || "").trim().toLowerCase() === session.email.trim().toLowerCase(),
      );
      if (me) {
        setF({
          name: me.name || "",
          phone: me.phone || "",
          address: me.address || "",
          zone: me.zone || "Clifton",
        });
      }
    } catch (error) {
      console.error("Failed to read profile from localStorage", error);
    }
  }, [session, router]);

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return toast("Please sign in");

    const trimmedName = f.name.trim();
    const trimmedPhone = f.phone.trim();
    const trimmedAddress = f.address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
      toast("Please complete all profile fields");
      return;
    }

    updateProfile(session.email, {
      name: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
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

"use client";
import { useState } from "react";
import { useApp } from "../AppProvider";
export function ContactPage() {
  const { toast } = useApp();
  const [n, setN] = useState("");
  return (
    <main className="page">
      <div className="container narrow">
        <div className="pageHero">
          <span className="eyebrow">CONTACT</span>
          <h1>Need a hand?</h1>
        </div>
        <form
          className="formCard"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Message submitted");
          }}
        >
          <label>
            Name
            <input required value={n} onChange={(e) => setN(e.target.value)} />
          </label>
          <label>
            Email
            <input required type="email" />
          </label>
          <label>
            Message
            <textarea required />
          </label>
          <button className="primary">Send message</button>
        </form>
      </div>
    </main>
  );
}

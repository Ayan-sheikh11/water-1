"use client";
import { Layout } from "./Shell";
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

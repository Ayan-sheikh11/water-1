import React, { Suspense } from "react";
import { AccountProfile } from "@/components/pages/AccountProfile";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AccountProfile />
    </Suspense>
  );
}

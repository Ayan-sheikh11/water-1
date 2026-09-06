import React, { Suspense } from "react";
import { OrderDetail } from "@/components/pages/OrderDetail";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderDetail />
    </Suspense>
  );
}

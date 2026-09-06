import React, { Suspense } from "react";
import { TrackPage } from "@/components/pages/TrackPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TrackPage />
    </Suspense>
  );
}

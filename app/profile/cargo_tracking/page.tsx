import React from "react";

import Navbar from "@/components/layout/navbar";
import CargoTracking from "@/components/modules/profile/cargoTracking";
import Footer from "@/components/layout/footer";

export default function CargoTrackingPage() {
  return (
    <div>
      <Navbar />
      <CargoTracking />
      <Footer />
    </div>
  );
}

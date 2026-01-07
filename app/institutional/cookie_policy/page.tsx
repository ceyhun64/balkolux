import React from "react";

import Navbar from "@/components/layout/navbar";
import CookiePolicy from "@/components/modules/institutional/security_cookie";
import Footer from "@/components/layout/footer";

export default function CookiePolicyPage() {
  return (
    <div>
      <Navbar />
      <CookiePolicy />
      <Footer />
    </div>
  );
}

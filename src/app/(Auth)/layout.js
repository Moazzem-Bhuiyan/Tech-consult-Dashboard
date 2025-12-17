import React from "react";
import backgroundImage from "@/assets/images/authbg.png";

export default function AuthLayout({ children }) {
  return (
    <div>
      <div
        className="fixed inset-0 z-0 flex items-center justify-center bg-black/70 bg-cover bg-center"
        // style={{ backgroundImage: `url(${backgroundImage?.src})` }}
      >
        <div className="mx-auto flex h-screen w-1/3 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

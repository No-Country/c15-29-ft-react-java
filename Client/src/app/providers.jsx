"use client";

import { NextUIProvider } from "@nextui-org/react";
import Toast from "@/components/toast/Toast";
import { AuthProvider } from "@/Api/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NavbarCheck } from "@/components/navbar/NavbarCheck";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        {/* <NavbarCheck /> */}
        <Toast />
        {children}
      </AuthProvider>
    </NextUIProvider>
  );
}

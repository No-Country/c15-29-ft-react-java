"use client";

import { NextUIProvider } from "@nextui-org/react";
import NavbarApp from "@/components/navbar/NavbarApp";
import Toast from "@/components/toast/Toast";
import { AuthProvider } from "@/Api/AuthContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <NavbarApp />
        <Toast />
        {children}
      </AuthProvider>
    </NextUIProvider>
  );
}

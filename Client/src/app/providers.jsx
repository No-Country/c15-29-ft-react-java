"use client";

import { NextUIProvider } from "@nextui-org/react";
import Toast from "@/components/toast/Toast";
import { AuthProvider } from "@/Api/AuthContext";
import { NavbarCheck } from "@/components/navbar/NavbarCheck";
import { PetProvider } from "@/Api/PetContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <PetProvider>
          <NavbarCheck />
          <Toast />
          {children}
        </PetProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

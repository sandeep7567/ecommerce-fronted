"use client";

import { CartContextProvider } from "@/components/provider/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <CartContextProvider>{children}</CartContextProvider>
  );
};
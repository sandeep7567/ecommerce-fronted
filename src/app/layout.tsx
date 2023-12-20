import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";

import { Providers } from "@/components/provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Fronted",
  description: "Ecommerce fronted To Get your products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>
            <GlobalStyles />
            <Header />
            {children}
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
};
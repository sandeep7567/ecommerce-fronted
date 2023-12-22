import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";

import { Providers } from "@/components/provider/Provider";

const poppins = Poppins({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"] });

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
      <body className={poppins.className}>
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
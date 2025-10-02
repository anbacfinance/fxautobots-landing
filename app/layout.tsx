import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FXAutoBots - Bots de Trading Algorítmico para MT4",
  description:
    "Bots de trading automatizado con resultados probados. Maximiza tus ganancias en Forex con nuestros bots para MetaTrader 4.",
  generator: ":)",
  icons: {
    icon: "/favicon.ico.png", // 👉 este es el favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

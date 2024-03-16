import "./globals.css";
import type { Metadata } from "next";
import { Pacifico, Source_Code_Pro, Inter } from "next/font/google";

import { AuthProviders } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "RIOT TECH",
  description: "RIOT TECH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceCodePro.variable} ${pacifico.variable} relative min-h-screen bg-background font-Inter   antialiased `}
      >
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <TooltipProvider delayDuration={100} skipDelayDuration={0}>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Fira_Mono } from "next/font/google";
import { Pacifico } from "next/font/google";

import { AuthProviders } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const firaMono = Fira_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fira-mono",
});

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Riot Tech",
  description: "Riot Tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <AuthProviders>
        <body
          className={`${inter.variable} ${firaMono.variable} ${pacifico.variable} font-Inter  selection:bg-green-300 dark:selection:bg-green-700 `}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
          </ThemeProvider>
        </body>
      </AuthProviders>
    </html>
  );
}

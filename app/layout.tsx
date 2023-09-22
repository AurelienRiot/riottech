import { AuthProviders } from "@/providers/auth-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

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
          className={`${inter.className} debug-screens selection:bg-green-300 dark:selection:bg-green-700`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {" "}
            <ToasterProvider />
            <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
          </ThemeProvider>
        </body>
      </AuthProviders>
    </html>
  );
}

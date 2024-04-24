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
        className={`${inter.variable} ${sourceCodePro.variable} ${pacifico.variable} relative min-h-dvh bg-background font-Inter   antialiased `}
      >
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <TooltipProvider delayDuration={100} skipDelayDuration={0}>
              <DebugScreens />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  );
}

const DebugScreens = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="fixed bottom-0 left-0 z-50 bg-foreground p-2 text-background">
        <ul className="text-xs font-semibold">
          <li className="xs:hidden block">{" < 400px"}</li>
          <li className="xs:block hidden sm:hidden">{"xs > 400px "}</li>
          <li className="hidden sm:block md:hidden">{"sm > 640px "}</li>
          <li className="hidden md:block lg:hidden">{"md > 768px "}</li>
          <li className="hidden lg:block xl:hidden">{"lg > 1024x "}</li>
          <li className="hidden xl:block 2xl:hidden">{"xl > 1220px"}</li>
          <li className="3xl:hidden hidden 2xl:block">{"2xl > 1440px"}</li>
          <li className="3xl:block hidden">{"3xl > 1700px"}</li>
        </ul>
      </div>
    );
  }

  return null;
};

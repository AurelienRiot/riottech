import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { AuthProviders } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
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
    <html
      lang="fr"
      suppressHydrationWarning
      className=" scroll-p-16 scroll-smooth"
    >
      <body
        className={`${inter.variable} ${sourceCodePro.variable} relative min-h-dvh bg-background font-Inter   antialiased `}
      >
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Toaster />
            <DebugScreens />
            {children}
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
          <li className="block xs:hidden">{" < 400px"}</li>
          <li className="hidden xs:block sm:hidden">{"xs > 400px "}</li>
          <li className="hidden sm:block md:hidden">{"sm > 640px "}</li>
          <li className="hidden md:block lg:hidden">{"md > 768px "}</li>
          <li className="hidden lg:block xl:hidden">{"lg > 1024x "}</li>
          <li className="hidden xl:block 2xl:hidden">{"xl > 1220px"}</li>
          <li className="hidden 2xl:block 3xl:hidden">{"2xl > 1440px"}</li>
          <li className="hidden 3xl:block">{"3xl > 1700px"}</li>
        </ul>
      </div>
    );
  }

  return null;
};

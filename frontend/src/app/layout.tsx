import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "./providers";

// @ts-ignore
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex flex-col w-full">
              <Header />
              <main className="flex-grow w-full">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="bottom-center" richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

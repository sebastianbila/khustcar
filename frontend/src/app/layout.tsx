import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Car Management System - Your Trusted Automotive Partner",
  description: "Discover the finest selection of quality vehicles at unbeatable prices. Browse our extensive inventory of new and pre-owned cars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

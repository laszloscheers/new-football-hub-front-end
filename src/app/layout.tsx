import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Football Hub",
  description: "Your web for football data consultation",
  robots: "noindex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <SessionAuthProvider>
            <Navbar />
              {children}
            <Toaster/>
            <Footer />
          </SessionAuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}

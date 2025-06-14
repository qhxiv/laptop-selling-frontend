import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import ShadCNLaptopChatbot from "@/components/LaptopChatbotWidget";
import { Toaster } from "sonner"

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Laptop Store",
  description: "Your one-stop shop for laptops",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased text-sm bg-background ${inter.className}`}
      suppressHydrationWarning>
        <Providers>
          {children}
          <ShadCNLaptopChatbot />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

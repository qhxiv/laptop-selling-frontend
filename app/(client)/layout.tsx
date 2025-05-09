import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Link from "next/link";

import { House, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import "../globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mua laptop",
  description: "Mua laptop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} bg-accent flex min-h-screen flex-col text-sm antialiased`}
      >
        <header className="border-border bg-background top-0 z-20 flex items-center justify-between border-b px-4 py-4 md:px-22">
          <div className="flex">
            <Link href="/">
              <Button
                size="icon"
                variant="outline"
                className="mr-2 hidden cursor-pointer md:inline-flex"
              >
                <House />
              </Button>
            </Link>

            <Input
              type="text"
              placeholder="Nhập sản phẩm cần tìm kiếm"
              className="w-40 rounded-r-none md:w-xs"
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none border-l-0"
            >
              <Search />
            </Button>
          </div>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Laptop mới</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Lenovo</NavigationMenuLink>
                  <NavigationMenuLink>Dell</NavigationMenuLink>
                  <NavigationMenuLink>HP</NavigationMenuLink>
                  <NavigationMenuLink>ASUS</NavigationMenuLink>
                  <NavigationMenuLink>Acer</NavigationMenuLink>
                  <NavigationMenuLink>Case đồng bộ Dell</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Laptop cũ</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Lenovo</NavigationMenuLink>
                  <NavigationMenuLink>Dell</NavigationMenuLink>
                  <NavigationMenuLink>HP</NavigationMenuLink>
                  <NavigationMenuLink>ASUS</NavigationMenuLink>
                  <NavigationMenuLink>Acer</NavigationMenuLink>
                  <NavigationMenuLink>Case đồng bộ Dell</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button className="md:hidden" size="icon" variant="outline">
            <Menu />
          </Button>
        </header>

        <main className="mt-4 flex grow flex-col gap-y-4 px-4 md:px-22">
          {children}
        </main>

        <footer className="border-border bg-background mt-4 border-t px-4 py-6 md:px-22">
          © 2025 Shopee. Tất cả các quyền được bảo lưu.
        </footer>
      </body>
    </html>
  );
}

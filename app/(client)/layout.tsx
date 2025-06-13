import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Link from "next/link";

import { ShoppingCart } from "lucide-react";
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
            <Button
              size="icon"
              variant="outline"
              className="mr-2 hidden md:inline-flex"
              asChild
            >
              <Link href="/">
                <House />
              </Link>
            </Button>

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

          <div className="flex gap-x-2">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button asChild variant="outline">
                    <NavigationMenuTrigger>Laptop mới</NavigationMenuTrigger>
                  </Button>
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
                  <Button asChild variant="outline">
                    <NavigationMenuTrigger>Laptop cũ</NavigationMenuTrigger>
                  </Button>
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

            <Button asChild size="icon" variant="outline">
              <Link href="/cart" className="relative">
                <ShoppingCart />

                <div className="bg-primary text-primary-foreground absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs">
                  4
                </div>
              </Link>
            </Button>
          </div>

          <Button className="md:hidden" size="icon" variant="outline">
            <Menu />
          </Button>
        </header>

        <main className="mt-4 flex grow flex-col gap-y-4 px-4 md:px-22">
          {children}
        </main>

        <footer className="border-border bg-background mt-4 border-t px-4 py-6 md:px-22">
          © 2025 qhxiv. Tất cả các quyền được bảo lưu.
        </footer>
      </body>
    </html>
  );
}

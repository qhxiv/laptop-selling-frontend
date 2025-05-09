import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import MiniProductCard from "@/components/ui/client/mini-product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];
  const arr3 = [1, 1, 1];

  return (
    <div className="flex flex-col gap-y-8">
      {arr3.map((num, index) => (
        <section key={index}>
          <div className="flex justify-between">
            <Tabs defaultValue="graphic_laptop" className="w-full">
              <div className="border-primary flex flex-row justify-between border-b">
                <div>
                  <div className="bg-primary text-primary-foreground mr-2 inline-block h-auto rounded-t-md rounded-b-none px-4 pt-2 pb-3 text-sm font-medium">
                    Laptop mới
                  </div>

                  <TabsList>
                    <TabsTrigger value="graphic_laptop">
                      Laptop đồ họa
                    </TabsTrigger>
                    <TabsTrigger value="gaming_laptop">
                      Laptop gaming
                    </TabsTrigger>
                    <TabsTrigger value="highend_laptop">
                      Laptop cao cấp
                    </TabsTrigger>
                  </TabsList>
                </div>

                <Link href="/category/new-laptop">
                  <Button className="cursor-pointer">Xem tất cả</Button>
                </Link>
              </div>

              <TabsContent
                value="graphic_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <MiniProductCard
                    key={index}
                    src="/image1.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    productId="abc"
                  />
                ))}
              </TabsContent>

              <TabsContent
                value="gaming_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <MiniProductCard
                    key={index}
                    src="/image2.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    productId="abc"
                  />
                ))}
              </TabsContent>

              <TabsContent
                value="highend_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <MiniProductCard
                    key={index}
                    src="/image3.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    productId="abc"
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      ))}
    </div>
  );
}

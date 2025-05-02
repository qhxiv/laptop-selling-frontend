import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/client/product-card";

import React from "react";

export default function Home() {
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];
  const arr3 = [1, 1, 1];

  return (
    <>
      {arr3.map((num, index) => (
        <section className="px-4 mt-8 md:px-22" key={index}>
          <div className="flex justify-between">
            <Tabs defaultValue="graphic_laptop" className="w-full">
              <div className="flex flex-row justify-between border-b border-primary">
                <div>
                  <div className="inline-block h-auto px-4 pt-2 pb-3 mr-2 text-sm font-medium rounded-b-none bg-primary text-primary-foreground rounded-t-md">
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

                <Link href="/new-laptop">
                  <Button className="cursor-pointer">Xem tất cả</Button>
                </Link>
              </div>

              <TabsContent
                value="graphic_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <ProductCard
                    key={index}
                    src="/image1.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    link="/new-laptop/amogus"
                  />
                ))}
              </TabsContent>

              <TabsContent
                value="gaming_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <ProductCard
                    key={index}
                    src="/image2.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    link="/new-laptop/amogus"
                  />
                ))}
              </TabsContent>

              <TabsContent
                value="highend_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <ProductCard
                    key={index}
                    src="/image3.jpg"
                    title="Lenovo Thinkpad T14S Gen 3 (2022)"
                    description="Core i5-1235U / Core i5-1240P. Nhiều option cấu hình"
                    warranty="12 tháng"
                    available={true}
                    originalPrice={1000000}
                    discountedPrice={9000000}
                    link="/new-laptop/amogus"
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      ))}
    </>
  );
}

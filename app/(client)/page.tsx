import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

export default function Home() {
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];
  const arr3 = [1, 1, 1];

  return (
    <>
      {arr3.map((num, index) => (
        <section className="mt-8" key={index}>
          <div className="flex justify-between">
            <Tabs defaultValue="graphic_laptop" className="w-full">
              <div className="flex flex-row justify-between border-b border-primary">
                <div>
                  {/* <Button className="h-auto pb-3 mr-2 rounded-b-none">
                    Laptop mới
                  </Button> */}
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
                  <Card
                    key={index}
                    className="py-4 transition-colors rounded-sm hover:border hover:border-primary"
                  >
                    <CardHeader className="px-4">
                      <div className="relative h-[100px]">
                        <Image
                          src="/image1.jpg"
                          alt="silly"
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <CardTitle>Lenovo Thinkpad T14S Gen 3 (2022)</CardTitle>
                      <CardDescription>
                        Core i5-1235U / Core i5-1240P. Nhiều option cấu hình
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4">
                      <p>
                        <span className="font-bold">Bảo hành:</span> 12 tháng
                      </p>

                      <p>
                        <span className="font-bold">Kho hàng:</span> sẵn sàng
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between px-4">
                      <div>
                        <h1 className="font-bold">9.000.000 $</h1>
                        <p className="line-through">1.000.000 $</p>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <ShoppingCart />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent
                value="gaming_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <Card
                    key={index}
                    className="py-4 transition-colors rounded-sm hover:border hover:border-primary"
                  >
                    <CardHeader className="px-4">
                      <div className="relative h-[100px]">
                        <Image
                          src="/image2.jpg"
                          alt="silly"
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <CardTitle>Lenovo Thinkpad T14S Gen 3 (2022)</CardTitle>
                      <CardDescription>
                        Core i5-1235U / Core i5-1240P. Nhiều option cấu hình
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4">
                      <p>
                        <span className="font-bold">Bảo hành:</span> 12 tháng
                      </p>

                      <p>
                        <span className="font-bold">Kho hàng:</span> sẵn sàng
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between px-4">
                      <div>
                        <h1 className="font-bold">9.000.000 $</h1>
                        <p className="line-through">1.000.000 $</p>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <ShoppingCart />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent
                value="highend_laptop"
                className="grid grid-cols-6 gap-4"
              >
                {arr12.map((num, index) => (
                  <Card
                    key={index}
                    className="py-4 transition-colors rounded-sm hover:border hover:border-primary"
                  >
                    <CardHeader className="px-4">
                      <div className="relative h-[100px]">
                        <Image
                          src="/image3.jpg"
                          alt="silly"
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <CardTitle>Lenovo Thinkpad T14S Gen 3 (2022)</CardTitle>
                      <CardDescription>
                        Core i5-1235U / Core i5-1240P. Nhiều option cấu hình
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4">
                      <p>
                        <span className="font-bold">Bảo hành:</span> 12 tháng
                      </p>

                      <p>
                        <span className="font-bold">Kho hàng:</span> sẵn sàng
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between px-4">
                      <div>
                        <h1 className="font-bold">9.000.000 $</h1>
                        <p className="line-through">1.000.000 $</p>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <ShoppingCart />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      ))}
    </>
  );
}

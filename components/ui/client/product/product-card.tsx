"use client";

import { cn, numberToVND } from "@/lib/utils";

import { useState } from "react";

import Image from "next/image";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({
  specs,
}: {
  specs: { [key: string]: string }[];
}) {
  const arr5 = [1, 2, 3, 4, 5];
  const productImages = [
    "/laptop1.jpg",
    "/laptop2.jpg",
    "/laptop3.jpg",
    "/ram.jpg",
    "/keyboard.jpg",
  ];

  const [chosenSpec, setChosenSpec] = useState(0);
  const [chosenImage, setChosenImage] = useState(0);

  return (
    <Card>
      <CardContent className="flex gap-x-2">
        <div className="flex-5/12 overflow-hidden">
          <div className="border-border relative rounded-md border md:h-60">
            <Image
              src={productImages[chosenImage]}
              alt="Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD 1920x1080"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Images slider */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {productImages.map((url, index) => (
              <div
                key={index}
                onClick={() => setChosenImage(index)}
                className={cn(
                  "relative box-border aspect-square cursor-pointer",
                  index === chosenImage && "border-primary border-2",
                )}
              >
                <Image src={url} alt="ohio" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="divide-border flex-7/12 flex-col gap-y-4 divide-y *:py-2 *:first:pt-0 *:last:pb-0">
          <header>
            <h1 className="text-2xl font-medium">
              Lenovo Thinkpad T490 (2019)
            </h1>

            <p>
              Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD
              1920x1080
            </p>
          </header>

          <div className="flex gap-x-2 divide-x *:pr-2">
            <div>
              Giá: <span className="font-bold">{numberToVND(3900000)}</span>
            </div>

            <div>
              Bảo hành: <span className="font-bold">03 tháng</span>
            </div>

            <div>
              Kho hàng: <span className="font-bold">Sẵn hàng</span>
            </div>
          </div>

          <div>
            <h1 className="font-medium uppercase">Chọn cấu hình:</h1>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {arr5.map((num, index) => (
                <div
                  key={index}
                  onClick={() => setChosenSpec(index)}
                  className={`${index === chosenSpec ? "border-primary bg-accent" : "border-border"} hover:border-primary box-border cursor-pointer rounded-sm border p-2 transition-colors`}
                >
                  <p>
                    Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0
                    inch FHD 1920x1080
                  </p>

                  <div className="mt-2 flex justify-between">
                    <span className="font-bold">{numberToVND(3900000)}</span>

                    <div>
                      BH: <span className="font-bold">03 tháng</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <Button variant="outline" className="cursor-pointer uppercase">
              <ShoppingCart /> THÊM VÀO GIỎ HÀNG
            </Button>

            <Button className="cursor-pointer uppercase">MUA NGAY</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

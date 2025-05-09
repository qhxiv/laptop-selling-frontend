import React from "react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductCard from "@/components/ui/client/product/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const specs = [
    {
      sum: "Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD 1920x1080",
      CPU: "Intel Core i5-8265U 4C-8T, 1.6GHz upto 3.4GHz, 6MB Cache",
      RAM: "8GB DDR4 2400MHz / DDR4 2666MHz",
      "Hard Drive": "SSD 256GB",
      GPU: "Intel UHD Graphics 620 / Intel UHD Graphics 10th Gen",
      Display: "14.0 inch FHD 1920x1080 IPS, 250 nits, 45% NTSC, anti-glare",
      Ports:
        "2xUSB 3.1 Gen 1, 1xUSB-C 3.1 Gen 1 (Power Delivery, DisplayPort 1.2), 1xUSB-C 3.1 Gen 2 (Thunderbolt 3, Power Delivery, DisplayPort 1.2), 1xHDMI 1.4b, MicroSD Card Reader, RJ-45, 3.5mm combo jack ",
      "DVD Drive": "No",
      Battery: "50 Wh",
      OS: "Windows 10 Professional 64 Bit",
      Dimensions: "32.9 x 22.7 x 1.7 (cm)",
      Weight: "1.5 kg",
      Color: "Black",
      Condition: "Used",
      Warranty: "6 months",
    },
    {
      sum: "Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD 1920x1080",
      CPU: "Intel Core i5-8265U 4C-8T, 1.6GHz upto 3.4GHz, 6MB Cache",
      RAM: "8GB DDR4 2400MHz / DDR4 2666MHz",
      "Hard Drive": "SSD 256GB",
      GPU: "Intel UHD Graphics 620 / Intel UHD Graphics 10th Gen",
      Display: "14.0 inch FHD 1920x1080 IPS, 250 nits, 45% NTSC, anti-glare",
      Ports:
        "2xUSB 3.1 Gen 1, 1xUSB-C 3.1 Gen 1 (Power Delivery, DisplayPort 1.2), 1xUSB-C 3.1 Gen 2 (Thunderbolt 3, Power Delivery, DisplayPort 1.2), 1xHDMI 1.4b, MicroSD Card Reader, RJ-45, 3.5mm combo jack ",
      "DVD Drive": "No",
      Battery: "50 Wh",
      OS: "Windows 10 Professional 64 Bit",
      Dimensions: "32.9 x 22.7 x 1.7 (cm)",
      Weight: "1.5 kg",
      Color: "Black",
      Condition: "Used",
      Warranty: "6 months",
    },
    {
      sum: "Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD 1920x1080",
      CPU: "Intel Core i5-8265U 4C-8T, 1.6GHz upto 3.4GHz, 6MB Cache",
      RAM: "8GB DDR4 2400MHz / DDR4 2666MHz",
      "Hard Drive": "SSD 256GB",
      GPU: "Intel UHD Graphics 620 / Intel UHD Graphics 10th Gen",
      Display: "14.0 inch FHD 1920x1080 IPS, 250 nits, 45% NTSC, anti-glare",
      Ports:
        "2xUSB 3.1 Gen 1, 1xUSB-C 3.1 Gen 1 (Power Delivery, DisplayPort 1.2), 1xUSB-C 3.1 Gen 2 (Thunderbolt 3, Power Delivery, DisplayPort 1.2), 1xHDMI 1.4b, MicroSD Card Reader, RJ-45, 3.5mm combo jack ",
      "DVD Drive": "No",
      Battery: "50 Wh",
      OS: "Windows 10 Professional 64 Bit",
      Dimensions: "32.9 x 22.7 x 1.7 (cm)",
      Weight: "1.5 kg",
      Color: "Black",
      Condition: "Used",
      Warranty: "6 months",
    },
    {
      sum: "Core i5-8365U (i5-8265U) / RAM 8GB / SSD 256GB / Màn 14.0 inch FHD 1920x1080",
      CPU: "Intel Core i5-8265U 4C-8T, 1.6GHz upto 3.4GHz, 6MB Cache",
      RAM: "8GB DDR4 2400MHz / DDR4 2666MHz",
      "Hard Drive": "SSD 256GB",
      GPU: "Intel UHD Graphics 620 / Intel UHD Graphics 10th Gen",
      Display: "14.0 inch FHD 1920x1080 IPS, 250 nits, 45% NTSC, anti-glare",
      Ports:
        "2xUSB 3.1 Gen 1, 1xUSB-C 3.1 Gen 1 (Power Delivery, DisplayPort 1.2), 1xUSB-C 3.1 Gen 2 (Thunderbolt 3, Power Delivery, DisplayPort 1.2), 1xHDMI 1.4b, MicroSD Card Reader, RJ-45, 3.5mm combo jack ",
      "DVD Drive": "No",
      Battery: "50 Wh",
      OS: "Windows 10 Professional 64 Bit",
      Dimensions: "32.9 x 22.7 x 1.7 (cm)",
      Weight: "1.5 kg",
      Color: "Black",
      Condition: "Used",
      Warranty: "6 months",
    },
  ];
  const arr5 = [1, 2, 3, 4, 5];

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/new-laptop">
              New laptop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductCard specs={specs} />

      {/* Product details */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-medium uppercase">
              THÔNG TIN SẢN PHẨM
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-[auto_1fr] gap-4">
          {Object.entries(specs[0]).map(
            ([key, value]) =>
              key !== "sum" && (
                <React.Fragment key={key}>
                  <div className="font-bold">{key}</div>
                  <div>{value}</div>
                </React.Fragment>
              ),
          )}
        </CardContent>
      </Card>

      {/* Customer review */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-medium uppercase">
              ĐÁNH GIÁ SẢN PHẨM
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-col divide-y">
          {arr5.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr] gap-x-2 p-2 first:pt-0 last:pb-0"
            >
              <Avatar className="row-span-2 self-center">
                <AvatarImage src="/image1.jpg" />
                <AvatarFallback>username</AvatarFallback>
              </Avatar>

              <div>
                <Link
                  href="#"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  username
                </Link>
              </div>
              <span className="font-light">2022-08-15 15:48</span>

              <p className="col-start-2 mt-2 whitespace-pre-line">
                {`Hàng chuẩn
                  Gói cẩn thận
                  Chuẩn bị hàng nhanh
                  Mua xong quên đếm
                  :)) Ko bt đủ số lượng ko .-.`}
              </p>
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </>
  );
}

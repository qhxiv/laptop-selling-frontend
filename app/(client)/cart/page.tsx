import { numberToVND } from "@/lib/utils";

import Image from "next/image";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Page() {
  const arr4 = [1, 1, 1, 1];

  return (
    <Card className="">
      <CardHeader className="border-border grid grid-cols-[auto_repeat(8,_1fr)] items-center border-b">
        <Checkbox className="mr-2" />

        <h1 className="col-span-4">Sản phẩm</h1>
        <h1 className="text-center">Đơn giá</h1>
        <h1 className="text-center">Số lượng</h1>
        <h1 className="text-center">Giá</h1>
        <h1 className="text-center">Thao tác</h1>
      </CardHeader>

      {arr4.map((_, index) => (
        <CardContent
          key={index}
          className="grid grid-cols-[auto_repeat(8,_1fr)] items-center"
        >
          <Checkbox className="mr-2" />
          <div className="col-span-4 flex">
            <div className="relative aspect-square h-[80px]">
              <Image
                src="/image1.jpg"
                alt="silly ahh"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center">
              <div className="flex-1/2 p-2">Lenovo Thinkpad T490 (2019)</div>
              <div className="flex-1/2 p-2">Phân loại hàng: lsdkjflsdkj</div>
            </div>
          </div>

          {/* Đơn giá */}
          <h2 className="text-center">{numberToVND(100000000)}</h2>

          {/* Số lượng */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-r-none border-r-0"
            >
              <Minus />
            </Button>
            <Input
              defaultValue={1}
              className="h-9 w-12 rounded-none p-2 text-center"
            ></Input>
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-l-none border-l-0"
            >
              <Plus />
            </Button>
          </div>

          {/* Giá */}
          <h2 className="text-center">{numberToVND(1000000000)}</h2>

          {/* Thao tác */}
          <Button variant="link" className="cursor-pointer">
            Xóa
          </Button>
        </CardContent>
      ))}

      <CardFooter className="flex justify-between border-t">
        <h1>Tổng cộng: {numberToVND(10000000)}</h1>
        <Button className="cursor-pointer">Mua hàng</Button>
      </CardFooter>
    </Card>
  );
}

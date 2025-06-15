import { numberToVND } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MiniProductCard({
  src,
  title,
  description,
  available,
  price,
  productId,
}: {
  src: string;
  title: string;
  description: string;
  available: boolean;
  price: number;
  productId: string;
}) {
  return (
    <Card className="hover:border-primary flex rounded-sm py-4 transition-colors hover:border">
      <CardHeader className="grow px-4">
        <div>
          <div className="relative h-[100px]">
            <Image src={src} alt={title} fill style={{ objectFit: "cover" }} />
          </div>

          <CardTitle className="mt-2">
            <Link
              href={`/product/${productId}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              <h1 className="leading-snug">{title}</h1>
            </Link>
          </CardTitle>

          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>

      <div>
        <CardContent className="px-4">
          <p>
            <span className="font-bold">Kho hàng:</span>{" "}
            {available ? "sẵn sàng" : "hết hàng"}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold">
              {available ? numberToVND(price) : "Liên hệ"}
            </h1>
          </div>

          {available && (
            <Button size="icon" variant="outline" className="cursor-pointer">
              <ShoppingCart />
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

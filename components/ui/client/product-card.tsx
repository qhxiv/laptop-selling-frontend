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

export default function ProductCard({
  src,
  title,
  description,
  warranty,
  available,
  originalPrice,
  discountedPrice,
  productId,
}: {
  src: string;
  title: string;
  description: string;
  warranty: string;
  available: boolean;
  originalPrice: number;
  discountedPrice?: number;
  productId: string;
}) {
  return (
    <Card className="hover:border-primary rounded-sm py-4 transition-colors hover:border">
      <CardHeader className="px-4">
        <div className="relative h-[100px]">
          <Image src={src} alt={title} fill style={{ objectFit: "cover" }} />
        </div>

        <CardTitle>
          <Link
            href={`/product/${productId}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            <h1 className="leading-snug">{title}</h1>
          </Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        <p>
          <span className="font-bold">Bảo hành:</span> {warranty}
        </p>

        <p>
          <span className="font-bold">Kho hàng:</span>{" "}
          {available ? "sẵn sàng" : "hết hàng"}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-lg font-bold">
            {available
              ? numberToVND(discountedPrice ? discountedPrice : originalPrice)
              : "Liên hệ"}
          </h1>

          {available && discountedPrice && (
            <p className="line-through">{numberToVND(originalPrice)}</p>
          )}
        </div>

        {available && (
          <Button size="icon" variant="outline" className="cursor-pointer">
            <ShoppingCart />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

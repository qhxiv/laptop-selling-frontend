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
import { link } from "fs";

export default function ProductCard({
  key,
  src,
  title,
  description,
  warranty,
  available,
  originalPrice,
  discountedPrice,
  link,
}: {
  key?: React.Key;
  src: string;
  title: string;
  description: string;
  warranty: string;
  available: boolean;
  originalPrice: number;
  discountedPrice?: number;
  link: string;
}) {
  return (
    <Card className="py-4 transition-colors rounded-sm hover:border hover:border-primary">
      <CardHeader className="px-4">
        <div className="relative h-[100px]">
          <Image src={src} alt={title} fill style={{ objectFit: "cover" }} />
        </div>

        <CardTitle>
          <Link
            href={link}
            className=" text-primary underline-offset-4 hover:underline"
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
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(discountedPrice ? discountedPrice : originalPrice)
              : "Liên hệ"}
          </h1>

          {available && discountedPrice && (
            <p className="line-through">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(originalPrice)}
            </p>
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

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];

  return (
    <>
      <div>This is the filter</div>

      <div className="grid grid-cols-6 gap-4">
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

              <Button size="icon" variant="outline" className="cursor-pointer">
                <ShoppingCart />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="">
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
    </>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/ui/client/product-card";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];

  return (
    <>
      <div className="flex items-center px-4 md:px-22 gap-x-2">
        <p>Bộ lọc</p>

        <Select>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="Khoảng giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Dưới 5 triệu</SelectItem>
            <SelectItem value="2">5 triệu - dưới 10 triệu</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="Hãng sản xuất" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Dưới 5 triệu</SelectItem>
            <SelectItem value="2">5 triệu - dưới 10 triệu</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="CPU" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Dưới 5 triệu</SelectItem>
            <SelectItem value="2">5 triệu - dưới 10 triệu</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="RAM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Dưới 5 triệu</SelectItem>
            <SelectItem value="2">5 triệu - dưới 10 triệu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-6 gap-4 px-4 mt-4 md:px-22">
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
            link="/amogus"
          />
        ))}
      </div>

      <Pagination className="px-4 mt-4 md:px-22">
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

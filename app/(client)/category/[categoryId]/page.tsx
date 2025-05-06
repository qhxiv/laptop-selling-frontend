import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/ui/client/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const arr12 = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{categoryId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-background border-border flex items-center gap-x-2 rounded-md border p-2">
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

      <div className="grid grid-cols-6 gap-4">
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
            productId="abc"
          />
        ))}
      </div>

      <Pagination className="mt-4">
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

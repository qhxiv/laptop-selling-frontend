import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import MiniProductCard from "@/components/ui/client/mini-product-card";

export default async function Home() {
  const categoriesData = await fetch("http://localhost:3000/categories");
  const categories = await categoriesData.json();

  return (
    <div className="flex flex-col gap-y-8">
      {categories.map((category) => (
        <section key={category.id}>
          <div>
            <div className="border-primary flex flex-row justify-between border-b">
              {/* Category name */}
              <div className="bg-primary text-primary-foreground mr-2 inline-block h-auto rounded-t-md rounded-b-none px-4 pt-2 pb-3 text-sm font-medium">
                {category.name}
              </div>

              <Button className="cursor-pointer" asChild>
                <Link href={`/category/${category.id}`}>Xem tất cả</Link>
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {category.product.slice(0, 12).map((product) => (
                <MiniProductCard
                  key={product.id}
                  src="/laptop2.jpg"
                  title={product.name}
                  description={product.description}
                  available={product.countInStock > 0}
                  price={product.price}
                  productId={product.id}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

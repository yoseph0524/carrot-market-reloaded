import ProductList from "@/components/product-list";
import db from "lib/db";
import Link from "next/link";
import { Prisma } from "@prisma/client";

function DeletedBanner() {
  return (
    <div className="w-full flex justify-center mb-6 animate-fade-in">
      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
        <span className="font-semibold text-lg">
          Product deleted successfully.
        </span>
        <Link
          href="/products"
          className="ml-4 underline hover:text-orange-100 transition text-black"
        >
          Dismiss
        </Link>
      </div>
    </div>
  );
}

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products({
  searchParams,
}: {
  searchParams?: { deleted?: string };
}) {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      {searchParams?.deleted === "1" && <DeletedBanner />}
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}

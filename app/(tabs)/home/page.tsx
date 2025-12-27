import ProductList from "@/components/product-list";
import db from "lib/db";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

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

const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Product",
};

// export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Products({
  searchParams,
}: {
  searchParams?: { deleted?: string };
}) {
  const initialProducts = await getInitialProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div>
      {searchParams?.deleted === "1" && <DeletedBanner />}

      <ProductList initialProducts={initialProducts} />

      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10 " />
      </Link>
    </div>
  );
}

import ListProduct from "@/components/list-product";
import db from "lib/db";
import Link from "next/link";

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

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

export default async function Products({
  searchParams,
}: {
  searchParams?: { deleted?: string };
}) {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {searchParams?.deleted === "1" && <DeletedBanner />}
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}

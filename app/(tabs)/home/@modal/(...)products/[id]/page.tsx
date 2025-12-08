import { notFound } from "next/navigation";
import CloseButton from "@/components/close-button";
import PrismaDB from "lib/db";
import Image from "next/image";

export default async function Modal({ params }: { params: { id: string } }) {
  const id = +params.id;
  if (isNaN(id)) {
    return notFound();
  }

  const product = await PrismaDB.product.findUnique({
    where: {
      id: id,
    },
    select: {
      photo: true,
      title: true,
    },
  });
  console.log(product);

  if (!product) {
    return notFound();
  }

  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      <CloseButton />
      <div className="max-w-screen-sm h-1/2  flex justify-center w-full">
        <div className="relative flex items-center justify-center overflow-hidden rounded-md aspect-square bg-neutral-700 text-neutral-200">
          {" "}
          <Image
            src={product.photo}
            alt={product.title}
            fill
            className="object-cover"
          />{" "}
        </div>
      </div>
    </div>
  );
}

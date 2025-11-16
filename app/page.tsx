import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex sm:bg-red-100 md:bg-green-100 lg:cyan-100 items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3 ">
        {["Nico", "Me", "You", "Yourself"].map((person, index) => (
          <div key={index} className="flex items-center gap-5 *:animate-pulse">
            <div className="size-10 bg-blue-400 rounded-full" />
            <span className=" w-40 h-4 rounded-full bg-gray-400" />
            <span className=" w-20 h-4 rounded-full bg-gray-400" />
          </div>
        ))}
      </div>
    </main>
  );
}

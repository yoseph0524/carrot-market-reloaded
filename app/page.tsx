import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex sm:bg-red-100 md:bg-green-100 lg:cyan-100 items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2">
        <input
          className="w-full rounded-full h-12 bg-gray-200 pl-5 outline-none ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shado placeholder:drop-shadow invalid:focus:ring-red-500 peer "
          type="email"
          placeholder="Search here..."
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          Email is required
        </span>
        <button className=" text-white py-2 rounded-full active:scale-90 focus:scale-90 transition-transform font-medium outline-none md:px-10 bg-gradient-to-tr from-cyan-500 via-yellow-300 to-purple-400 peer-invalid:bg-red-300">
          Search
        </button>
      </div>
    </main>
  );
}

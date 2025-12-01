import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justi min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span>🥕</span>
        <h1>Carrot</h1>
        <h2>Welcome to CarrotMarket</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full py-2.5 rounded-md text-center">
        <Link
          href="/create-account"
          className="w-full bg-orange-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors "
        >
          Start
        </Link>
        <div className="flex gap-2 ">
          <span>Do you have account?</span>
          <Link href="/login" className="hover:underline underline-offset-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

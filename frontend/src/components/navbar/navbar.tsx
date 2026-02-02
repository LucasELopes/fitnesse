import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="MyGym logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-8 text-lg font-semibold">
          <Link
            href="/"
            className="text-gray-300 hover:text-orange-500 transition-colors"
          >
            Treinos
          </Link>

          <Link
            href="/exercicios"
            className="text-gray-300 hover:text-orange-500 transition-colors"
          >
            Exercicios
          </Link>
        </div>

      </div>
    </nav>
  );
}

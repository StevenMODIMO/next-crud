import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <main className="shadow font-light">
      <header className="flex justify-between m-2 p-2">
        <Link href="/">
          <Image
            src="/next.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <div className="flex gap-3 text-xl">
          <Link href="/crud">Crud</Link>
          <Link href="/auth/signup">Signup</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      </header>
    </main>
  );
}

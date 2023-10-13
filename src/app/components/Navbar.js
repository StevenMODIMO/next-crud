"use client";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { BiPencil } from "react-icons/bi";
import { HiLogin } from "react-icons/hi";

export default function Navbar() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  return (
    <SessionProvider>
      <main className="text-light">
        <header className="flex justify-between m-2 p-2">
          <Link href="/">
            <Image
              src="/next.svg"
              alt="Vercel Logo"
              x
              width={100}
              height={24}
              priority
            />
          </Link>
          <div className="flex gap-12 text-xl rounded-full bg-black/10 p-2">
            {isAuth ? (
              <>
                <div className="font-semibold text-sm">{data.user.id}</div>
                <Link href="/crud">Crud</Link>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/auth/signup" className="flex gap-2">
                  <h1>Sign Up</h1>
                  <BiPencil className="mt-1" />
                </Link>
                <Link href="/auth/login" className="flex gap-2">
                  <h1>Log In</h1>
                  <HiLogin className="mt-1" />
                </Link>
              </>
            )}
          </div>
        </header>
      </main>
    </SessionProvider>
  );
}

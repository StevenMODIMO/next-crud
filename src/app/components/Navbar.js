"use client";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  return (
    <SessionProvider>
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
            {isAuth ? (
              <>
              <div className="font-semibold text-sm">{data.user.id}</div>
                <Link href="/crud">Crud</Link>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/auth/signup">Sign Up</Link>
                <Link href="/auth/login">Log In</Link>
              </>
            )}
          </div>
        </header>
      </main>
    </SessionProvider>
  );
}

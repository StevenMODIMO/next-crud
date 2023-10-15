"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiPencil } from "react-icons/bi";
import { HiLogin } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const [show, setShow] = useState(false);
  return (
    <main>
      <header>
        <section className="flex justify-between p-2">
          <Link href="/">
            <Image
              src="/next.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </Link>
          <div onClick={() => setShow(!show)}>
            {!show ? (
              <FaBars className="text-2xl text-light sm:hidden" />
            ) : (
              <FaTimes className="text-2xl text-light sm:hidden" />
            )}
          </div>
        </section>
        <NavLinks isAuth={isAuth} data={data} show={show} setShow={setShow} />
        <div className="hidden">
          {isAuth ? (
            <>
              <div>{data.user.id}</div>
              <Link href="/crud">Crud</Link>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="flex gap-2 ml-3 bg-black rounded-full text-white w-28 m-1 p-2"
              >
                <AiOutlineHome className="mt-1 text-lg" />
                <h1>Home</h1>
              </Link>
              <Link
                href="/auth/signup"
                className="flex gap-2 ml-3 bg-black rounded-full text-white w-28 m-1 p-2"
              >
                <BiPencil className="mt-1 text-lg" />
                <h1>Sign Up</h1>
              </Link>
              <Link
                href="/auth/login"
                className="flex gap-2 ml-3 bg-black rounded-full text-white w-28 m-1 p-2"
              >
                <HiLogin className="mt-1 text-lg" />
                <h1>Log In</h1>
              </Link>
            </>
          )}
        </div>
      </header>
    </main>
  );
}

const NavLinks = ({ isAuth, data, show, setShow }) => {
  return (
    <motion.div animate={{ x: show ? 0 : -800 }} className="absolute bg-black/60 p-2 h-[500px] w-full sm:hidden">
      {isAuth ? (
        <>
          <div>{data.user.id}</div>
          <div>{data.user.email}</div>
          <Link href="/crud" 
          onClick={() => setShow(false)}>Crud</Link>
          <button onClick={() => {
            signOut()
            setShow(false)
          }}>Sign Out</button>
        </>
      ) : (
        <>
          <Link
          onClick={() => setShow(false)}
            href="/"
            className="flex gap-2 bg-black rounded-full my-6 text-white w-44 m-1 p-2"
          >
            <AiOutlineHome className="mt-1 text-lg" />
            <h1>Home</h1>
          </Link>
          <Link
          onClick={() => setShow(false)}
            href="/auth/signup"
            className="flex gap-2 bg-black rounded-full my-6 text-white w-44 m-1 p-2"
          >
            <BiPencil className="mt-1 text-lg" />
            <h1>Sign Up</h1>
          </Link>
          <Link
          onClick={() => setShow(false)}
            href="/auth/login"
            className="flex gap-2 bg-black rounded-full my-6 text-white w-44 m-1 p-2"
          >
            <HiLogin className="mt-1 text-lg" />
            <h1>Log In</h1>
          </Link>
        </>
      )}
      <div>&copy; copyright next-crud 2023</div>
    </motion.div>
  );
};

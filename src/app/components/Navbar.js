"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiPencil } from "react-icons/bi";
import { HiLogin } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiLogout } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const [show, setShow] = useState(false);
  return (
    <main>
      <header className="sm:flex justify-between">
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
        <div className="hidden sm:flex">
          {isAuth ? (
            <div className="flex gap-4 p-3">
              <div className="text-thin text-sm cursor-pointer bg-gray-300 rounded-full p-2">
                {data.user.id}
              </div>
              <section className="flex gap-2 p-2">
                <MdOutlineDashboardCustomize className="mt-1 text-lg" />
                <Link href="/crud">Crud</Link>
              </section>
              <section className="flex gap-2 p-2">
                <HiLogout className="mt-1 text-lg" />
                <button onClick={() => signOut()}>Sign Out</button>
              </section>
            </div>
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
    <motion.div
      animate={{ x: show ? 0 : -800 }}
      className="absolute bg-black/60 p-2 h-screen w-full sm:hidden"
    >
      {isAuth ? (
        <div className="flex gap-4 p-3">
          <div className="text-thin text-sm cursor-pointer bg-gray-300 rounded-full p-2">
            {data.user.id}
          </div>
          <section className="flex gap-2 p-2">
            <MdOutlineDashboardCustomize className="mt-1 text-lg" />
            <Link href="/crud">Crud</Link>
          </section>
          <section className="flex gap-2 p-2">
            <HiLogout className="mt-1 text-lg" />
            <button onClick={() => signOut()}>Sign Out</button>
          </section>
        </div>
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
      <div className="text-white">&copy; copyright next-crud 2023</div>
    </motion.div>
  );
};

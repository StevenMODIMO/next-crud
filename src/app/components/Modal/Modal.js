"use client";
import { motion } from "framer-motion";

export default function Modal({ children, params }) {
  return (
    <main className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6">
        {children}
      </div>
    </main>
  );
}

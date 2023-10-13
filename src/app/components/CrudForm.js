"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CrudForm() {
  const { data, status } = useSession()
  const [title, setTitle] = useState("");
  const [crud, setCrud] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/crud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, crud }),
    });

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      setLoading(false);
      setTitle("");
      setCrud("");
    } else {
      setLoading(false);
      setTitle("");
      setCrud("");
      setError(null);
    }
  };
  return (
    <main className="bg-green-50 rounded shadow">
      <header className="text-center m-2 text-lg font-bold">
        <h1>Add new Crud</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        className="flex flex-col"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="crud title."
          className="outline-none p-2 m-3 border w-80"
        />
        <input
          type="text"
          value={crud}
          onChange={(e) => setCrud(e.target.value)}
          placeholder="crud description"
          className="outline-none p-2 m-3 border w-80"
        />
        <button className={!loading ? "mx-auto" : ""}>
          {!loading ? (
            <div className="bg-green-500 p-2 rounded m-3">Add Crud</div>
          ) : (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </button>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="mx-auto bg-red-300 py-1 px-8 text-white m-3 rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </main>
  );
}

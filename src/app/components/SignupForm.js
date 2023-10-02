"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/auth/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      setLoading(false);
      setEmail("");
      setPassword("");
    } else {
      console.log(json);
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="shadow-lg p-4 h-[80%] bg-gradient-to-b from-green-100 from-10%">
      <header className="text-center text-xl">
        <h1>Sign Up to Get Started</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        className="flex flex-col space-y-4 mt-8"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border bg-gray-100 p-1 m-2 w-80 rounded"
          placeholder="example@gmail.com"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border bg-gray-100 p-1 m-2 w-80 rounded"
          placeholder="strong password"
          type="password"
        />
        <button className={!loading ? "mx-auto" : ""}>
          {!loading ? (
            <div className="bg-green-500 p-2 rounded m-3">Sign Up</div>
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

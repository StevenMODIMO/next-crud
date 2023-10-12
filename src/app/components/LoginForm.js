"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000/crud",
    });

    if (res.error) {
      setError(res.error);
      setEmail("");
      setPassword("");
      setLoading(false);
    } else {
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/crud");
    }
  };

  return (
    <main className="shadow-lg p-4 h-[100%] bg-gradient-to-r from-green-100 from-10%">
      <header className="text-center text-xl">
        <h1>Log In to Continue</h1>
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
            <div className="bg-green-500 p-2 rounded m-3">Login</div>
          ) : (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </button>
        <div className="mx-auto">
          <h2>OR</h2>
        </div>
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
      <button
        className="flex gap-2 text-xl bg-green-200 p-1 m-2 rounded mx-auto"
        onClick={() => signIn("google")}
      >
        <FcGoogle className="mt-1" /> <h1>Continue with Google</h1>
      </button>
    </main>
  );
}

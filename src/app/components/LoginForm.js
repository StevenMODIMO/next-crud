"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      console.log(res);
      setLoading(false);
    }
  };

  return (
    <main className="shadow-lg p-4 h-[80%] bg-gradient-to-r from-green-100 from-10%">
      <header className="text-center text-xl">
        <h1>Log In to Continue</h1>
      </header>
      <form className="flex flex-col space-y-4 mt-8">
        <input
          className="outline-none border bg-gray-100 p-1 m-2 w-80 rounded"
          placeholder="example@gmail.com"
          type="text"
        />
        <input
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
        {error && (
          <div className="mx-auto bg-red-300 py-1 px-8 text-white m-3 rounded">
            Empty fields detected
          </div>
        )}
      </form>
    </main>
  );
}

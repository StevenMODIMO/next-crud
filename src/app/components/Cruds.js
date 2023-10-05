"use client";
import { useState, useEffect } from "react";

export default function Cruds() {
  const [cruds, setCruds] = useState([]);

  useEffect(() => {
    const getCruds = async () => {
      const res = await fetch("/api/crud", { cache: "no-store"});
      const json = await res.json();
      if (json.error) {
        console.log(json.error);
      } else {
        setCruds(json);
      }
    };
    getCruds();
  }, []);
  return (
    <main className="bg-green-50 rounded shadow">
      <header className="text-center m-2 text-lg font-bold">
        <h1>Cruds You Added.</h1>
      </header>
      <section className="grid grid-cols-2 gap-2">
        {cruds?.map((crud) => {
          return (
            <main key={crud._id} className="shadow p-2 m-2 bg-white">
              <h1 className="text-center font-semibold">{crud.title}</h1>
              <div className="text-start">{crud.crud}</div>
              <div className="flex justify-between m-2">
                <button className="bg-gray-100 p-1 rounded shadow">Edit</button>
                <button className="bg-gray-100 p-1 rounded shadow">Delete</button>
              </div>
            </main>
          );
        })}
      </section>
    </main>
  );
}

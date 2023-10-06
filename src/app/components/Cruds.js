"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Cruds() {
  const [cruds, setCruds] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const getCruds = async () => {
      const res = await fetch("/api/crud",{ cache: "no-store"});
      const json = await res.json();
      if (json.error) {
        console.log(json.error);
      } else {
        setCruds(json);
      }
    };
    getCruds();
  }, []);
  const deleteCrud = async (id) => {
    const res = await fetch(`/api/crud/${id}`, {
      method: "DELETE",
    })

    const json = await res.json()

    if(json.error) {
      console.log(json.error)
    } else {
      console.log(json)
      router.refresh("/crud")
    }
  }
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
              <div className="font-light text-xs">{crud._id}</div>
              <div className="flex justify-between m-2">
                <button className="bg-gray-100 p-1 rounded shadow">Edit</button>
                <button className="bg-gray-100 p-1 rounded shadow" onClick={() => deleteCrud(crud._id)}>Delete</button>
              </div>
            </main>
          );
        })}
      </section>
    </main>
  );
}

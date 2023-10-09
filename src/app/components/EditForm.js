"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function EditForm({ title, crud, id }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newCrud, setNewCrud] = useState(crud);
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/crud/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, crud: newCrud }),
    });

    const json = await res.json()

    if(res.ok) {
        router.push("/crud")
    } else {
        console.log(json.error)
    }
  };
  return (
    <main>
      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            for="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            for="crud"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            CRUD
          </label>
          <input
            id="crud"
            type="text"
            value={newCrud}
            onChange={(e) => setNewCrud(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none"
          />
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </main>
  );
}

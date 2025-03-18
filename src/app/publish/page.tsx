"use client";

import { useState } from "react";

export default function Publicar() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage("Debes iniciar sesión para publicar");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          image: form.image,
        }),
      });

      if (!res.ok) {
        setMessage("Error al publicar el producto");
        return;
      }

      setMessage("Producto publicado con éxito");
      setForm({ name: "", price: "", image: "" });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrió un error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Publicar Producto</h2>

      <input
        type="text"
        placeholder="Nombre"
        className="w-full p-2 border rounded mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Precio"
        className="w-full p-2 border rounded mb-2"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        className="w-full p-2 border rounded mb-2"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Publicar
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
}

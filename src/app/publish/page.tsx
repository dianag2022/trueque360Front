"use client";

import { useState } from "react";

export default function Publicar() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publicando producto:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Publicar Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        className="w-full p-2 border rounded mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Precio"
        className="w-full p-2 border rounded mb-2"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        className="w-full p-2 border rounded mb-2"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Publicar
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signUp(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}

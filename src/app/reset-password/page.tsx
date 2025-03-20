"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("access_token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data: { message?: string } = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating password");
      setMessage("Contraseña actualizada correctamente");
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Unknown error");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Cambiar Contraseña
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
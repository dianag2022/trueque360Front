import React from "react";

// 1️⃣ Botón principal reutilizable
export const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
};
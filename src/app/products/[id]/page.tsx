"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUser } from "@/services/auth";
import Image from "next/image";
import { fetchProductById } from "@/services/api";

export default function ProductDetail() {
  const { id  } = useParams(); // Ahora extraemos `id` correctamente
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    console.log(id);
    
    if (id) {
      fetchProductById(id)
        .then(setProduct)
        .catch(() => router.push("/products"));
    }
  }, [id, router]);

  const handleContact = async () => {
    try{
        const user = await getUser();
        alert("Abrir chat con el vendedor");
    }catch(error){
      console.error(error);
        router.push("/login");
      
    }
  };


  if (!product) return <p className="text-center">Cargando...</p>;

  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Image 
        src={product.image} 
        alt={product.name} 
        width={500} 
        height={300} 
        className="rounded-lg object-cover w-full" 
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-gray-700">${product.price}</p>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <button onClick={handleContact} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Contactar</button>
    </div>
  );
}

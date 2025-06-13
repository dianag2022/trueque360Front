"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/product-card";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types";


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

    return (
   <main className="flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
       
                <div>
                    <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
                    )}
                    
        </div>
       
      </div>
    </main>
  );
}

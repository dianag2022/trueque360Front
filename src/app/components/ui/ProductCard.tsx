import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {

  
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </Link>
  );
}

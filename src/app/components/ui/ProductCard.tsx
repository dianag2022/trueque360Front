import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}
export default function ProductCard({ product }: { product: Product }) {

  
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image src={product.image} alt={product.name} width={200} height={200} />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </Link>
  );
}

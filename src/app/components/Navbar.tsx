import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Trueque360
        </Link>
        <div className="space-x-4">
          <Link href="/products" className="hover:underline">
            Productos
          </Link>
          <Link href="/publish" className="hover:underline">
            Publicar
          </Link>
          <Link href="/chat" className="hover:underline">
            Chat
          </Link>
        </div>
      </div>
    </nav>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function fetchProductById(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return response.json();
}

export async function addProduct(product: { name: string; price: number; image: string }) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

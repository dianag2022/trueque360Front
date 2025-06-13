export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  embedding?: number[];
  score?: number;
}

export interface Service extends Product {
  seller_id: string;
  availability: string;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  services: Service[];
  products: Product[];
  categories: string[];
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
} 
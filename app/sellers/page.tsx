"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin } from "lucide-react";
import Link from "next/link";

interface Seller {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  services: number;
  products: number;
  categories: string[];
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers`);
        if (!response.ok) throw new Error('Failed to fetch sellers');
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.categories.some(category => 
      category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendedores</h1>
          <p className="text-gray-600 mt-2">
            Conoce a nuestros vendedores y sus ofertas
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar vendedores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSellers.map((seller) => (
            <Link key={seller.id} href={`/sellers/${seller.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-6">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{seller.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{seller.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{seller.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {seller.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {seller.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{seller.services} servicios</span>
                      <span>•</span>
                      <span>{seller.products} productos</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron vendedores</p>
          </div>
        )}
      </div>
    </div>
  );
} 
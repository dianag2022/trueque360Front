import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description?: string;
  score?: number;
}

export function ProductCard({ name, price, image, description, score }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        {score !== undefined && (
          <p className="mt-2 text-xs text-muted-foreground">
            Match score: {(score * 100).toFixed(1)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
} 
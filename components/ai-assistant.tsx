"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import OpenAI from "openai";
import ProductCard from "./ui/product-card";
import { Product, Message } from "@/types";

const MAX_MESSAGE_HISTORY = 3; // Keep only last 3 messages

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const embedText = async (text: string): Promise<number[]> => {
    try {
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: text,
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to get embeddings');
      }

      const data = await res.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  };

  const cosineSimilarity = (a: number[], b: number[]): number => {
    if (!a || !b || a.length !== b.length) {
      return 0;
    }
    
    try {
      const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dot / (normA * normB);
    } catch (error) {
      console.error('Error calculating similarity:', error);
      return 0;
    }
  };

  const getSimilarProducts = async (input: string, products: Product[]) => {
    try {
      const userEmbedding = await embedText(input);

      const productsWithEmbeddings = products.filter(p => p.embedding && p.embedding.length > 0);

      if (productsWithEmbeddings.length === 0) {
        return products.slice(0, 5);
      }

      const scored = productsWithEmbeddings.map((product) => ({
        ...product,
        score: cosineSimilarity(userEmbedding, product.embedding!),
      }));

      const sorted = scored.sort((a, b) => b.score - a.score);
      return sorted.slice(0, 5);
    } catch (error) {
      console.error('Error finding similar products:', error);
      return products.slice(0, 5);
    }
  };

  const sortProductsByAIResponse = (products: Product[], aiResponse: string): Product[] => {
    const productOrder = new Map<string, number>();
    const productNames = products.map(p => p.name.toLowerCase());
    
    const sentences = aiResponse.toLowerCase().split(/[.!?]+/);
    sentences.forEach((sentence, index) => {
      productNames.forEach(name => {
        if (sentence.includes(name)) {
          productOrder.set(name, index);
        }
      });
    });

    return [...products].sort((a, b) => {
      const aOrder = productOrder.get(a.name.toLowerCase()) ?? Infinity;
      const bOrder = productOrder.get(b.name.toLowerCase()) ?? Infinity;
      return aOrder - bOrder;
    });
  };

  const formatProductInfo = (products: Product[]): string => {
    return products
      .map(p => `${p.name} ($${p.price})${p.description ? ` - ${p.description}` : ""}`)
      .join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Update messages with limited history
    const updatedMessages: Message[] = [
      ...messages.slice(-MAX_MESSAGE_HISTORY),
      { role: "user" as const, content: userMessage }
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (!productsRes.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const products: Product[] = await productsRes.json();
      const relevantProducts = await getSimilarProducts(userMessage, products);

      const systemMessage: Message = {
        role: "system" as const,
        content: `You are a shopping assistant. Recommend from these products:\n${formatProductInfo(relevantProducts)}`
      };

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          systemMessage,
          ...updatedMessages.slice(-1) // Only send the last message
        ] as OpenAI.Chat.ChatCompletionMessageParam[],
        max_tokens: 150, // Limit response length
      });

      const assistantMessage = completion.choices[0].message.content || "";
      
      const sortedProducts = sortProductsByAIResponse(relevantProducts, assistantMessage);
      setRecommendedProducts(sortedProducts);

      setMessages(prev => [
        ...prev,
        { role: "assistant" as const, content: assistantMessage }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Lo siento, hubo un error al procesar tu solicitud. Inténtalo de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Shopping Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 border rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">Pensando...</div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe lo que necesitas..."
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {recommendedProducts.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Productos recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
              key={product.id} product={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
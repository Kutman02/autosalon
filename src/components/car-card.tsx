"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { Car } from '@/types/car'
import Link from 'next/link'
import Image from 'next/image'

interface CarCardProps extends Car {
  isFavorite: boolean
  onFavoriteToggle: (id: string) => void
}

export function CarCard({
  id,
  brand,
  model,
  year,
  price,
  images,
  onFavoriteToggle,
  isFavorite,
}: CarCardProps) {
  const handleFavoriteClick = () => {
    onFavoriteToggle(id);
    toast.success(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <Link href={`/catalog/${id}`}>
        <CardContent className="p-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative aspect-video">
              <Image
                src={images[0]}
                alt={`${brand} ${model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{brand} {model}</h3>
            <p className="text-sm text-muted-foreground">{year} год</p>
            <p className="text-lg font-bold mt-2">{price.toLocaleString()} ₽</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between p-4">
        <Button 
          variant="default"
          className="w-full mr-2"
          onClick={() => window.location.href = `tel:+71234567890`}
        >
          <Phone className="mr-2 h-4 w-4" />
          Позвонить
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleFavoriteClick}
          className={cn(
            "transition-colors duration-200",
            isFavorite && "text-yellow-500 hover:text-yellow-600"
          )}
        >
          <Star 
            className={cn(
              "h-4 w-4",
              isFavorite && "fill-current"
            )}
          />
        </Button>
      </CardFooter>
    </Card>
  );
} 
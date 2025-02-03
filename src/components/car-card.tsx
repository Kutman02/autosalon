"use client"

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { toast } from 'sonner'
import type { Car } from '@/types/car'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { HeartIcon } from '@/components/icons'

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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/catalog/${id}`}>
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative aspect-video">
              <Image
                src={images[0]}
                alt={`${brand} ${model}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{brand} {model}</h3>
            <p className="text-sm text-muted-foreground">{year} год</p>
            <p className="text-lg font-bold mt-2">{price.toLocaleString()} с</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between p-4 border-t">
        <button 
          className="flex items-center justify-center w-full mr-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onClick={() => window.location.href = `tel:+71234567890`}
        >
          <Phone className="mr-2 h-4 w-4" />
          Позвонить
        </button>
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "flex items-center justify-center rounded-md border h-10 w-10 transition-colors hover:bg-accent hover:text-accent-foreground",
            isFavorite && "text-yellow-500 hover:text-yellow-600"
          )}
        >
          <HeartIcon 
            className={cn(
              "h-5 w-5",
              isFavorite && "fill-current"
            )} 
          />
        </button>
      </div>
    </div>
  );
} 
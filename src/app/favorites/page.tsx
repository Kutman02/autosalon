'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { getCars } from '@/data/cars';
import { CarCard } from '@/components/car-card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { Car } from '@/types/car';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const cars = getCars();
  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  const handleClearAll = () => {
    toggleFavorite('');
    toast.success('Список избранного очищен');
  };

  if (favoriteCars.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Избранное</h1>
        <p className="text-center text-muted-foreground">В избранном пока ничего нет</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Избранное</h1>
        <Button
          variant="destructive"
          onClick={handleClearAll}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Очистить список
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCars.map((car) => (
          <CarCard
            key={car.id}
            {...car}
            isFavorite={true}
            onFavoriteToggle={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
} 
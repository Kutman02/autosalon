'use client';

import { useState, useCallback } from 'react';
import { Toaster } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CarCard } from '@/components/car-card';
import { Filters, FilterValues } from '@/components/filters';
import { MobileFilters } from '@/components/mobile-filters';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Car } from '@/types/car';

interface CatalogClientProps {
  initialCars: Car[];
}

export function CatalogClient({ initialCars }: CatalogClientProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [cars] = useState<Car[]>(initialCars);
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    brand: 'all',
    priceRange: [0, Math.max(...cars.map((car) => car.price))],
    yearRange: [1900, new Date().getFullYear()],
    bodyType: 'all',
    transmission: 'all',
    fuelType: 'all',
  });

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) 
        ? prev.filter((fId) => fId !== id)
        : [...prev, id]
    );
  };

  const filteredCars = useCallback(() => {
    return cars.filter((car) => {
      // Поиск по тексту
      if (filters.search) {
        const searchText = filters.search.toLowerCase();
        const carText = `${car.brand} ${car.model}`.toLowerCase();
        if (!carText.includes(searchText)) return false;
      }

      // Фильтр по марке
      if (filters.brand !== 'all' && car.brand !== filters.brand) return false;

      // Фильтр по цене
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;

      // Фильтр по году
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) return false;

      // Фильтр по типу кузова
      if (filters.bodyType !== 'all' && car.bodyType !== filters.bodyType) return false;

      // Фильтр по коробке передач
      if (filters.transmission !== 'all' && car.transmission.type !== filters.transmission) return false;

      // Фильтр по типу топлива
      if (filters.fuelType !== 'all' && car.fuel !== filters.fuelType) return false;

      return true;
    });
  }, [cars, filters]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Каталог автомобилей</h1>

      <MobileFilters cars={cars} onFiltersChange={setFilters} />

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <div className="hidden lg:block">
          <Filters cars={cars} onFiltersChange={setFilters} />
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars().map((car) => (
              <CarCard
                key={car.id}
                {...car}
                isFavorite={favorites.includes(car.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
          {filteredCars().length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                По вашему запросу ничего не найдено
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      <Toaster />
    </div>
  );
} 
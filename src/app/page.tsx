'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCars } from '@/data/cars';
import { CarCard } from '@/components/car-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Filters, FilterValues } from '@/components/filters';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Car } from '@/types/car';

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const [cars] = useState<Car[]>(() => getCars());
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleFiltersChange = (filters: FilterValues) => {
    let result = [...cars];

    // Поиск по тексту
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchResult = result.filter((car) => {
        const carText = `${car.brand} ${car.model}`.toLowerCase();
        return carText.includes(search);
      });
      result = searchResult;
    }

    // Фильтр по марке
    if (filters.brand !== 'all') {
      result = result.filter((car) => car.brand === filters.brand);
    }

    // Фильтр по цене
    result = result.filter(
      (car) => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1],
    );

    // Фильтр по году
    result = result.filter(
      (car) => car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1],
    );

    // Фильтр по типу кузова
    if (filters.bodyType !== 'all') {
      result = result.filter((car) => car.bodyType === filters.bodyType);
    }

    // Фильтр по коробке передач
    if (filters.transmission !== 'all') {
      result = result.filter((car) => car.transmission.type === filters.transmission);
    }

    // Фильтр по типу топлива
    if (filters.fuelType !== 'all') {
      result = result.filter((car) => car.fuel === filters.fuelType);
    }

    setFilteredCars(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero секция */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Найдите свой идеальный автомобиль</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Широкий выбор новых и подержанных автомобилей в Бишкеке
        </p>
      </section>

      {/* Каталог */}
      <section className="py-12">
        {/* Мобильная кнопка фильтров */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            {isFiltersOpen ? (
              <>
                <X className="h-4 w-4" />
                Скрыть фильтры
              </>
            ) : (
              <>
                <SlidersHorizontal className="h-4 w-4" />
                Показать фильтры
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Фильтры */}
          <aside className={`${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <Filters
              cars={cars}
              onFiltersChange={handleFiltersChange}
              className="sticky top-4"
              compact={!isFiltersOpen}
            />
          </aside>

          {/* Список автомобилей */}
          <div>
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">По вашему запросу ничего не найдено</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    {...car}
                    isFavorite={favorites.includes(car.id)}
                    onFavoriteToggle={() => toggleFavorite(car.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

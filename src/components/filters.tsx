'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import { Car } from '@/types/car';
import { cn } from '@/lib/utils';

interface FiltersProps {
  cars: Car[];
  onFiltersChange: (filters: FilterValues) => void;
  className?: string;
  compact?: boolean;
}

export interface FilterValues {
  search: string;
  brand: string;
  priceRange: [number, number];
  yearRange: [number, number];
  bodyType: string;
  transmission: string;
  fuelType: string;
}

export function Filters({ cars, onFiltersChange, className, compact }: FiltersProps) {
  // Получаем только используемые значения
  const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();
  const bodyTypes = Array.from(new Set(cars.map((car) => car.bodyType))).sort();

  // Находим минимальные и максимальные значения
  const minPrice = Math.min(...cars.map((car) => car.price));
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const minYear = Math.min(...cars.map((car) => car.year));
  const maxYear = Math.max(...cars.map((car) => car.year));

  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    brand: 'all',
    priceRange: [minPrice, maxPrice],
    yearRange: [minYear, maxYear],
    bodyType: 'all',
    transmission: 'all',
    fuelType: 'all',
  });

  const handleFilterChange = (key: keyof FilterValues, value: string | number[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      search: '',
      brand: 'all',
      priceRange: [minPrice, maxPrice],
      yearRange: [minYear, maxYear],
      bodyType: 'all',
      transmission: 'all',
      fuelType: 'all',
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className={cn("space-y-6", compact && "space-y-4", className)}>
      <div className="space-y-2">
        <h3 className={cn("font-medium", compact && "text-sm")}>Поиск</h3>
        <Input
          placeholder="Поиск по марке или модели"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={cn(compact && "h-8 text-sm")}
        />
      </div>

      <div className="space-y-2">
        <h3 className={cn("font-medium", compact && "text-sm")}>Быстрые фильтры</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.brand === 'all' ? 'default' : 'outline'}
            size={compact ? 'sm' : 'default'}
            onClick={() => handleFilterChange('brand', 'all')}
          >
            Все марки
          </Button>
          {brands.slice(0, 5).map((brand) => (
            <Button
              key={brand}
              variant={filters.brand === brand ? 'default' : 'outline'}
              size={compact ? 'sm' : 'default'}
              onClick={() => handleFilterChange('brand', brand)}
            >
              {brand}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={cn("font-medium", compact && "text-sm")}>Цена</h3>
        <div className="px-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={10000}
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            className={cn("my-4", compact && "my-2")}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0].toLocaleString()} с</span>
            <span>{filters.priceRange[1].toLocaleString()} с</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={cn("font-medium", compact && "text-sm")}>Год выпуска</h3>
        <div className="px-2">
          <Slider
            min={minYear}
            max={maxYear}
            step={1}
            value={filters.yearRange}
            onValueChange={(value) => handleFilterChange('yearRange', value)}
            className={cn("my-4", compact && "my-2")}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.yearRange[0]}</span>
            <span>{filters.yearRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={cn("font-medium", compact && "text-sm")}>Тип кузова</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.bodyType === 'all' ? 'default' : 'outline'}
            size={compact ? 'sm' : 'default'}
            onClick={() => handleFilterChange('bodyType', 'all')}
          >
            Все типы
          </Button>
          {bodyTypes.map((type) => (
            <Button
              key={type}
              variant={filters.bodyType === type ? 'default' : 'outline'}
              size={compact ? 'sm' : 'default'}
              onClick={() => handleFilterChange('bodyType', type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size={compact ? 'sm' : 'default'}
        className="w-full"
        onClick={handleReset}
      >
        <X className="mr-2 h-4 w-4" />
        Сбросить фильтры
      </Button>
    </div>
  );
} 
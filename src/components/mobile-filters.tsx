'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterIcon } from 'lucide-react';
import { Filters } from '@/components/filters';
import type { Car } from '@/types/car';
import type { FilterValues } from '@/components/filters';
import { Badge } from '@/components/ui/badge';

interface MobileFiltersProps {
  cars: Car[];
  onFiltersChange: (filters: FilterValues) => void;
  activeFilters: number;
}

export function MobileFilters({ cars, onFiltersChange, activeFilters }: MobileFiltersProps) {
  return (
    <div className="lg:hidden mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full relative">
            <FilterIcon className="mr-2 h-4 w-4" />
            Фильтры
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] px-4">
          <div className="flex items-center justify-between mb-4">
            <SheetHeader className="mb-0">
              <SheetTitle>Фильтры</SheetTitle>
            </SheetHeader>
          </div>
          <ScrollArea className="h-full pr-4">
            <Filters 
              cars={cars} 
              onFiltersChange={onFiltersChange}
              className="pb-8"
              compact
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
} 
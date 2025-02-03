import { Suspense } from 'react';
import { getCars } from '@/lib/cars';
import { CatalogClient } from './catalog-client';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600; // Обновлять кэш каждый час

export default async function CatalogPage() {
  const cars = await getCars();

  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogClient initialCars={cars} />
    </Suspense>
  );
}

function CatalogSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="h-8 w-48 bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
} 
import { Suspense } from 'react';
import { getCarById } from '@/lib/cars';
import { CarDetails } from './car-details';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Обновлять кэш каждый час

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await getCarById(params.id);

  if (!car) {
    notFound();
  }

  return (
    <Suspense fallback={<CarDetailsSkeleton />}>
      <CarDetails car={car} />
    </Suspense>
  );
}

function CarDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-video rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
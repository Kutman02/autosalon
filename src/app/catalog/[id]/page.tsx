import { Suspense } from 'react';
import { getCarById, getCars } from '@/lib/cars';
import { CarDetails } from './car-details';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import type { PageProps } from '@/types/page';

export const revalidate = 3600; // Обновлять кэш каждый час

type SearchParams = { [key: string]: string | string[] | undefined };

type CatalogItemParams = {
  id: string;
};

// Определяем типы для страницы
export default async function CatalogItemPage({
  params,
  searchParams,
}: PageProps<CatalogItemParams>) {
  try {
    const car = await getCarById(params.id);

    if (!car) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<CarDetailsSkeleton />}>
          <CarDetails car={car} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading car:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">
          Произошла ошибка при загрузке данных
        </h1>
        <p className="text-muted-foreground">
          Пожалуйста, попробуйте обновить страницу
        </p>
      </div>
    );
  }
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

// Обновляем типы для generateMetadata
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  try {
    const car = await getCarById(params.id);

    if (!car) {
      return {
        title: 'Автомобиль не найден | AutoSalon',
        description: 'К сожалению, запрашиваемый автомобиль не найден',
      };
    }

    return {
      title: `${car.brand} ${car.model} ${car.year} | AutoSalon`,
      description: `${car.brand} ${car.model} ${car.year} года выпуска, ${car.mileage} км пробега, цена ${car.price.toLocaleString()} сом. Купить автомобиль в Бишкеке.`,
      openGraph: {
        title: `${car.brand} ${car.model} ${car.year}`,
        description: `${car.brand} ${car.model} ${car.year} года выпуска, ${car.mileage} км пробега`,
        images: [{ url: car.images[0] }],
      },
    };
  } catch {
    return {
      title: 'Ошибка | AutoSalon',
      description: 'Произошла ошибка при загрузке данных',
    };
  }
}

// Обновляем generateStaticParams чтобы генерировать статические пути для всех машин
export async function generateStaticParams() {
  const cars = getCars(); // Получаем все машины
  return cars.map((car) => ({
    id: car.id,
  }));
} 
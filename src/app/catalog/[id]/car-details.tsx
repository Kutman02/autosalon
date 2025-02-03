'use client';

import { Button } from '@/components/ui/button';
import { Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Car } from '@/types/car';

// Динамически загружаем компонент галереи
const DynamicCarGallery = dynamic(() => import('@/components/car-gallery'), {
  loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
});

interface CarDetailsProps {
  car: Car;
}

export function CarDetails({ car }: CarDetailsProps) {
  return (
    <div className="container mx-auto p-4">
      <Link href="/catalog">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад в каталог
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Галерея изображений */}
        <div className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <DynamicCarGallery images={car.images} />
          </Suspense>
        </div>

        {/* Информация об автомобиле */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
            <p className="text-2xl font-bold text-primary mt-2">
              {car.price.toLocaleString()} ₽
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Основные характеристики</h3>
              <p>Год: {car.year}</p>
              <p>Пробег: {car.mileage.toLocaleString()} км</p>
              <p>Кузов: {car.bodyType}</p>
              <p>Состояние: {car.state}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Технические характеристики</h3>
              <p>Двигатель: {car.engineVolume} л</p>
              <p>Топливо: {car.fuel}</p>
              <p>Коробка: {car.transmission.type}</p>
              <p>Привод: {car.driveType}</p>
            </div>
          </div>

          <Button className="w-full" size="lg">
            <Phone className="mr-2 h-4 w-4" />
            Позвонить
          </Button>
        </div>
      </div>
    </div>
  );
} 
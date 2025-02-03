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
          
          {/* TikTok ссылка */}
          {car.tiktokUrl && (
            <a
              href={car.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 rounded-lg border bg-black text-white hover:bg-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span>Смотреть обзор в TikTok</span>
            </a>
          )}
        </div>

        {/* Информация об автомобиле */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
            <p className="text-2xl font-bold text-primary mt-2">
              {car.price.toLocaleString()} с
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
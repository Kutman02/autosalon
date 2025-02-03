'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getLatestCars } from '@/lib/cars';
import type { Car } from '@/types/car';
import Image from 'next/image';

export default function Home() {
  const [cars] = useState<Car[]>(() => getLatestCars());

  return (
    <div>
      {/* Hero секция */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Найдите автомобиль</span>
              <span className="block text-blue-200">своей мечты</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-blue-100 sm:max-w-3xl">
              Широкий выбор новых и подержанных автомобилей. Выгодные условия покупки и
              кредитования.
            </p>
            <div className="mt-10 flex gap-4">
              <Link href="/catalog">
                <Button size="lg" className="gap-2">
                  Смотреть каталог
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" size="lg">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Большой выбор</h3>
              <p className="text-muted-foreground">
                Более 1000 автомобилей в наличии от ведущих производителей
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Все автомобили проходят тщательную техническую проверку
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-4">Выгодные условия</h3>
              <p className="text-muted-foreground">
                Кредит, лизинг, trade-in и другие специальные предложения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Последние поступления */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Последние поступления</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Link key={car.id} href={`/catalog/${car.id}`} className="group block">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video">
                    <Image
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">{car.year} год</p>
                  <p className="text-lg font-bold mt-2">{car.price.toLocaleString()} ₽</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/catalog">
              <Button variant="outline" size="lg">
                Смотреть все автомобили
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  );
}

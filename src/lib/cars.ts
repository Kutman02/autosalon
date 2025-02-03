import carsData from '@/data/cars.json';
import type { Car } from '@/types/car';

const cars: Car[] = carsData.cars;

export function getLatestCars(count: number = 3): Car[] {
  return [...cars]
    .sort((a, b) => b.year - a.year)
    .slice(0, count);
}

export function getCars(): Car[] {
  return cars;
}

export async function getCarById(id: string): Promise<Car | undefined> {
  // Имитируем задержку для более реалистичной загрузки
  await new Promise(resolve => setTimeout(resolve, 100));
  return cars.find((car) => car.id === id);
} 
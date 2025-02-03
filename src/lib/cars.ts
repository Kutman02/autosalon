import { cars } from '@/data/cars.json';
import type { Car } from '@/types/car';

export function getLatestCars(count: number = 3): Car[] {
  return cars.slice(0, count);
}

export function getCars(): Car[] {
  return cars;
}

export async function getCarById(id: string): Promise<Car | undefined> {
  return cars.find((car) => car.id === id);
} 
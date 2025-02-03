import carsData from '@/data/cars.json';
import type { Car } from '@/types/car';

export function getLatestCars(count: number = 3): Car[] {
  return carsData.cars.slice(0, count);
}

export function getCars(): Car[] {
  return carsData.cars;
}

export function getCarById(id: string): Car | undefined {
  return carsData.cars.find(car => car.id === id);
} 
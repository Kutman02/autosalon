import type { Car } from '@/types/car';
import carsJson from './cars.json';

function validateCarData(data: unknown): Car[] {
  if (!Array.isArray(data)) {
    throw new Error('Cars data must be an array');
  }

  return data.map((car) => {
    if (!car || typeof car !== 'object') {
      throw new Error('Car must be an object');
    }

    if (car.availability?.status !== 'В наличии' && car.availability?.status !== 'Под заказ') {
      throw new Error('Invalid availability status');
    }

    return car as Car;
  });
}

const carsData = { cars: validateCarData(carsJson.cars) };

export function getLatestCars(count: number = 3): Car[] {
  return carsData.cars.slice(0, count);
}

export function getCars(): Car[] {
  return carsData.cars;
}

export function getCarById(id: string): Car | undefined {
  return carsData.cars.find((car) => car.id === id);
}

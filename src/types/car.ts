export interface Car {
  id: string
  state: string
  brand: string
  model: string
  mileage: number
  year: number
  bodyType: string
  transmission: {
    type: string
    gears: number
  }
  fuel: string
  engineVolume: number
  color: string
  steering: 'Слева' | 'Справа'
  availability: 'В наличии' | 'Под заказ'
  driveType: string
  payment: {
    exchange: boolean
    cash: boolean
  }
  condition: string
  vin: string
  customs: 'Растаможен' | 'Не растаможен'
  price: number
  images: string[]
} 
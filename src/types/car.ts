export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  bodyType: string
  state: string
  engineVolume: number
  fuel: string
  transmission: {
    type: string
    gears: number
  }
  driveType: string
  images: string[]
  specs: {
    power: number
    acceleration: number
    consumption: {
      city: number
      highway: number
      mixed: number
    }
  }
  equipment: string[]
  color: {
    exterior: string
    interior: string
  }
  availability: {
    status: 'В наличии' | 'Под заказ'
    location: string
    deliveryTime?: number
  }
  discount?: {
    amount: number
    expires?: string
  }
  tiktokUrl?: string
  tiktokId?: string
} 
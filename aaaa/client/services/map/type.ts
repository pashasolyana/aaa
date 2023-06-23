export type getAllCoordinatesRes = {
  pvz: coordinateObjEntitySearch[]
  currentPage: number
}

export interface coordinateObjEntitySearch {
  location: {
    address: string
    city: string
    city_code: number
    country_code: string
    fiasCode: string
    fullAddress: string
    latitude: string
    longitude: string
    postal_code: string
    region: string
    region_code: 7
  }
  name: string
  phone: string[]
  pics: string[]
  workedTime: string
  _id: string
}

export interface coordinateObjEntity {
  geometry: {
    coordinates: [number, number]
    type: string
  }
  id: string
  properties: {
    description: string
    name: string
  }
  type: string
  get: any
}

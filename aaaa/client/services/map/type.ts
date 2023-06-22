export type getAllCoordinatesRes = {
  location: { longitude: string; latitude: string }
  _id: string
}[]

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
  get:any
}

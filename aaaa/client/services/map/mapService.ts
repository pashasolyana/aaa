import axios from 'axios'
import { coordinateObjEntity, getAllCoordinatesRes } from './type'

export const mapService = {
  async getAllСoordinates({
    page,
    searchText
  }: {
    page: number
    searchText: string
  }) {
    const res = await axios.get<getAllCoordinatesRes>(
      `http://81.200.152.89/api/pvz/list?page=${page}&limit=20` +
        (searchText ? `&search=${searchText}` : '')
    )
    return res.data
  },
  async getPunktByCoordinates({id}:{id:string}) {
    const res = await axios.get<coordinateObjEntity>(
      `http://81.200.152.89/api/pvz/${id}`
    )
    return res.data
  }
}

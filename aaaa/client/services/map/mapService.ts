import axios from 'axios'
import { getAllCoordinatesRes } from './type'

export const mapService = {
  async getAllСoordinates() {
    const res = await axios.get<getAllCoordinatesRes>(`http://81.200.152.89/api/pvz/coordinatOnly`)
    return res.data
  }
}

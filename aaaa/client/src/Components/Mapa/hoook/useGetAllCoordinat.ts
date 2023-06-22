import { useQuery } from 'react-query'
import { mapService } from '../../../../services/map/mapService'

export const useGetAllCoordinat = () => {
  return useQuery('getAllCoordinat', mapService.getAllСoordinates, {
    retry: 1
  })
}

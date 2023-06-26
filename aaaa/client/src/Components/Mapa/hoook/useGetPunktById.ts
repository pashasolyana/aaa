import { useQuery } from 'react-query'
import { mapService } from '../../../../services/map/mapService'

export const useGetPunktById = (id: string) => {
  return useQuery(['getPunktById',id], () =>
    mapService.getPunktByCoordinates({ id })
  )
}

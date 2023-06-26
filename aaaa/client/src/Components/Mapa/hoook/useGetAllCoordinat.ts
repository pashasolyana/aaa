import { useInfiniteQuery } from 'react-query'
import { mapService } from '../../../../services/map/mapService'

export const useGetAllCoordinat = ({searchText}:{searchText:string}) => {
  return useInfiniteQuery(
    ['getAllCoordinat',searchText],
    ({ pageParam = 1 }) => mapService.getAllСoordinates({ page: pageParam,searchText }),
    {
      retry: 1,
      getNextPageParam: (page, prevPage) => {
        if (page.pvz && page.pvz.length > 0) {
          return (page.currentPage + 1) as number
        }
      },
      keepPreviousData: true,
      cacheTime:0
    }
  )
}

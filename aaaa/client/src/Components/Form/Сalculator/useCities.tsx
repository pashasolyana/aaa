import { useInfiniteQuery } from 'react-query'
import { OtherService } from '../../../../services/other/other.service'
//@ts-ignore
const fetchInfiniteCities = async ({ search }) => {
  try {
    return await OtherService.getCities(search)
  } catch (err: any) {
    throw new Error(err)
  }
}

interface IUseServicesProps {
  search?: string | null
}

const useCities = ({ search }: IUseServicesProps) => {
  return useInfiniteQuery(
    //@ts-ignore
    [`services`, JSON.stringify({ search })],
    //@ts-ignore
    () => fetchInfiniteCities({ search }),
  )
}

export default useCities
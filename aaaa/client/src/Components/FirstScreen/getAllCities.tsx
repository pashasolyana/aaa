import { useInfiniteQuery } from 'react-query'
import { OtherService } from '../../../services/other/other.service'
//@ts-ignore
const fetchInfinitegetAllCities = async () => {
  try {
    return await OtherService.getAllCities()
  } catch (err: any) {
    throw new Error(err)
  }
}

const getAllCities = () => {
  return useInfiniteQuery(
    //@ts-ignore
    [`all-cities`, JSON.stringify()],
    //@ts-ignore
    () => fetchInfinitegetAllCities(),
  )
}

export default getAllCities
import { FetchNextPageOptions } from 'react-query/types/core'

interface useScrollProps {
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => void
}

export const useScroll = ({ fetchNextPage }: useScrollProps) => {
  const checkScroll = (e: any) => {
    if (
      e.target.scrollHeight ===
      Math.round(e.target.clientHeight + e.target.scrollTop)
    ) {
      fetchNextPage()
    }
  }

  return {
    checkScroll
  }
}

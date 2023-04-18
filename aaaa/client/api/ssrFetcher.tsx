import { API_URL, getContentType } from '../api/interceptor'
import axios from 'axios'

export const ssrInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: getContentType()
})

export default async function ssrFetcher<T>(
  url: string,
  ctx: any
): Promise<T | null> {
  try {
    return ssrInstance
      .get<T>(url, {
        headers: ctx.req
          ? {
              Authorization: `Bearer ${ctx.req.cookies.accessToken}`
            }
          : undefined
      })
      .then((r) => r.data)
  } catch {
    return null
  }
}

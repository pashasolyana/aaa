import axios from 'axios'
import { APP_URL } from '../constants'
import { getTokensFromStorage } from '../services/auth/auth.helpers'
import { AuthService } from '../services/auth/auth.service'
import Cookies from 'js-cookie'

export const API_URL = `${APP_URL}/api`

export const getContentType = () => ({
  'Content-Type': 'application/json'
})

export const axiosClassic = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: getContentType()
})

export const instance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: getContentType()
})

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokensFromStorage()

    if (config.headers && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const onFailRefresh = () => {
  AuthService.logout()
  window.location.href = '/login'
}

// refresh access tokens
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (
      originalRequest.url !== '/login' &&
      !originalRequest.url.includes('/findMe') &&
      error.response
    ) {
      if (error.response.status === 401 && !originalRequest._retry) {
        // const token = getAccessTokenFromStorage()

        // if (!token) {
        //   onFailRefresh()
        //   return instance(originalRequest)
        // }

        originalRequest._retry = true

        try {
          const { accessToken } = await AuthService.refreshAccessTokens()

          if (!accessToken) {
            originalRequest._retry = false
            onFailRefresh()
            return instance(originalRequest)
          }

          if (accessToken) {
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + accessToken
            Cookies.set('session', accessToken)
          }

          return instance(originalRequest)
        } catch (_error) {
          onFailRefresh()
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(error)

    // if (error.response.status === 401 && !originalRequest._retry) {
    // 	originalRequest._retry = true
    // 	const { accessToken } = await AuthService.refreshAccessTokens()
    //
    // 	if (accessToken) {
    // 		axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    // 		Cookies.set('session', accessToken)
    // 	}
    //
    // 	return instance(originalRequest)
    // }
    // return Promise.reject(error)
  }
)

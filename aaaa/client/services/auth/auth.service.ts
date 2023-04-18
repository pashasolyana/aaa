import { axiosClassic, instance } from '../../api/interceptor'
import {
  getRefreshTokenFromStorage,
  removeTokenFromStorage,
  saveTokenToStorage
} from '../auth/auth.helpers'
import { IRefreshToken } from '../auth/refresh-token.interface'

export const AuthService = {
  async signIn(username: string, password: string) {
    const response = await axiosClassic.post('/gen/login', {
        userName: "web_site_user",
        password: "5f7ZJzNW7K",
        marketPvz: 15,
        companyCode: "LUB",
        clientVersion: "MOBILE"
    })

    if (response.data.accessToken && response.data.refreshToken) {
      saveTokenToStorage(response.data.accessToken, response.data.refreshToken)
    }

    return response.data
  },

  async refreshAccessTokens() {
    const refreshToken = getRefreshTokenFromStorage()

    if (!refreshToken) {
      throw new Error('No refresh token')
    }

    const response = await instance.put<IRefreshToken>('/auth/refreshToken', {
      token: refreshToken
    })

    if (response.data.accessToken && response.data.refreshToken) {
      const { accessToken, refreshToken } = response.data

      saveTokenToStorage(accessToken, refreshToken)

      return {
        accessToken,
        refreshToken
      }
    } else {
      throw new Error('No new tokens')
    }

    return {}
  },

  logout() {
    removeTokenFromStorage()
  }
}

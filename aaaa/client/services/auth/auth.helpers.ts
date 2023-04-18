import Cookies from 'js-cookie'

export const saveTokenToStorage = (
  accessToken: string,
  refreshToken: string
) => {
  Cookies.set('accessToken', accessToken)
  Cookies.set('refreshToken', refreshToken)
}

export const getAccessTokenFromStorage = () => {
  return Cookies.get('accessToken')
}

export const getRefreshTokenFromStorage = () => {
  return Cookies.get('refreshToken')
}

export const getTokensFromStorage = () => {
  return {
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken')
  }
}

export const removeTokenFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

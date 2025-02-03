import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../functions/localStorage'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    params.append('auth', authStore.userData.token)
    config.params = params
  }

  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    const originRequest = error.config

    if (error.response.status === 401 && !originRequest._retry) {
      originRequest._retry = true

      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: getItemFromLocalStorage('userTokens').refreshToken,
          },
        )

        authStore.userData.token = newTokens.data.access_token
        authStore.userData.refreshToken = newTokens.data.refresh_token

        setItemToLocalStorage('userTokens', {
          expiresIn: '3600',
          token: newTokens.data.access_token,
          refreshToken: newTokens.data.refresh_token,
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
)

export default axiosApiInstance

import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

export const useAuthStore = defineStore('auth', () => {
  const userData = ref({
    token: '',
    email: '',
    refreshToken: '',
    expiresIn: '', // время истечения access token
    userId: '',
  })

  const errorMsg = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const authType = type === 'signIn' ? 'signInWithPassword' : 'signUp'
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${apiKey}`

    errorMsg.value = ''
    loader.value = true

    try {
      const res = await axios.post(endpoint, { ...payload, returnSecureToken: true })

      userData.value = {
        token: res.data.idToken,
        email: res.data.email,
        refreshToken: res.data.refreshToken,
        expiresIn: res.data.expiresIn,
        userId: res.data.localId,
      }

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: res.data.idToken,
          refreshToken: res.data.refreshToken,
          expiresIn: res.data.expiresIn,
        }),
      )
    } catch (error) {
      console.log(error)
      errorMsg.value = getErrorMsg(error.response.data.error.message)
      throw errorMsg.value
    } finally {
      loader.value = false
    }
  }
  return { auth, userData, errorMsg, loader }
})

function getErrorMsg(err) {
  switch (err) {
    case 'EMAIL_EXISTS':
      return 'Адрес электронной почты уже используется другой учетной записью.'
    case 'EMAIL_NOT_FOUND':
      return 'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.'
    case 'INVALID_EMAIL':
      return 'Неправильный адрес электронной почты.'
    case 'INVALID_PASSWORD':
      return 'Пароль неверен или у пользователя нет пароля.'
    case 'MISSING_PASSWORD':
      return 'Введите пароль.'
    case 'MISSING_EMAIL':
      return 'Введите адрес электронной почты.'
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Неправильный пароль или почта.'
    default:
      return 'Произошла какая-то херня. Повторите попытку позже.'
  }
}

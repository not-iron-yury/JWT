import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const apiKey = 'AIzaSyCLXYbwDgRFqgXMA2Mw-25ZKFpyJmkTBgw'

export const useAuthStore = defineStore('auth', () => {
  const userData = {
    token: '',
    email: '',
    refreshToken: '',
    expiresIn: '', // время истечения access token
    userId: '',
  }

  const errorMsg = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const sign = type
    errorMsg.value = ''
    loader.value = true
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:${sign}?key=${apiKey}`
    try {
      const res = await axios.post(endpoint, { ...payload, returnSecureToken: true })

      userData.value = {
        token: res.data.idToken,
        email: res.data.email,
        refreshToken: res.data.refreshToken,
        expiresIn: res.data.expiresIn,
        userId: res.data.localId,
      }
    } catch (error) {
      errorMsg.value = getErrorMsg(error.response.data.error.message)
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
    case 'OPERATION_NOT_ALLOWED':
      return 'Анонимный вход пользователя в этот проект отключен.'
    case 'EMAIL_NOT_FOUND':
      return 'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.'
    case 'INVALID_PASSWORD':
      return 'Пароль неверен или у пользователя нет пароля.'
    default:
      return 'Произошла ошибка. Возможно данные заполнены некорректно.'
  }
}

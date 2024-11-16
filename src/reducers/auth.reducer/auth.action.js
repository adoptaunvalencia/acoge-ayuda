import { fetchAuth } from '../../services/services'

export const registerUser = async (formData, dispatchLoad, showToast) => {
  const uriApi = 'user/register-user'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')
    console.log(response);
    
    if (response.status !== 201) {
      return showToast('error', data.message)
    } else {
      showToast('success', '¡Registro completado!')
      return data
    }
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}
export const loginUser = async (formData, dispatchLoad, showToast) => {
  const uriApi = 'user/login-user'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')

    if (response.status !== 200) {
      showToast('error', data.message)
    }
    return data
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

export const forgotPassword = async (formData, dispatchLoad) => {
  const uriApi = 'user/forgot-password'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')
    if (response.status !== 201) {
      showToast('error', data.message)
    }
    return data
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

export const verifyCode = async (formData, dispatchLoad) => {
  const uriApi = 'user/comprove-token'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')
    if (response.status !== 200) {
      showToast('error', data.message)
    }
    localStorage.setItem('FORGOT_TOKEN', JSON.stringify(formData))
    return data
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

export const resetPassword = async (formData, dispatchLoad, token) => {
  const parsedToken = JSON.parse(token)
  formData.token = parsedToken.verificationCode
  const uriApi = 'user/create-password'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'PUT')
    if (response.status !== 200) {
      showToast('error', data.message)
    }
    localStorage.removeItem('FORGOT_TOKEN')
    return data
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

export const fetchUser = async (formData, dispatchLoad, token) => {
  const uriApi = `user/get-user/${formData}`
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'GET', token)
    if (response.status !== 200) {
      console.log('error:')
    }
    return data
  } catch (error) {
    showToast('error', error.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

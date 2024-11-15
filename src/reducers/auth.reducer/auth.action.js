import { fetchAuth } from '../../services/services'

export const registerUser = async (formData, dispatchLoad) => {
  const uriApi = 'user/register-user'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')
    if (response.status !== 201) {
      console.log('error')
    }
    return data
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}
export const loginUser = async (formData, dispatchLoad) => {
  const uriApi = 'user/login-user'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST')
    if (response.status !== 200) {
      console.log('error')
    }
    return data
  } catch (error) {
    console.log(error)
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
      console.log('error')
    }
    return data
  } catch (error) {
    console.log(error)
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
      console.log('error')
    }
    localStorage.setItem('FORGOT_TOKEN', JSON.stringify(formData))
    return data
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

export const resetPassword = async (formData, dispatchLoad, token) => {
  const parsedToken = JSON.parse(token)
  formData.token = parsedToken.verificationCode
  console.log(formData)

  const uriApi = 'user/create-password'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'PUT')
    if (response.status !== 200) {
      console.log('error')
    }
    localStorage.removeItem('FORGOT_TOKEN')
    return data
  } catch (error) {
    console.log(error)
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
    console.log(error)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

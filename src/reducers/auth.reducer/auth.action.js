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
    dispatchLoad({ type: 'LOAD_FALSE' })
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
    dispatchLoad({ type: 'LOAD_FALSE' })
  }

}
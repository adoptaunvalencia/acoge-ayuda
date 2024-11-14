import { fetchAuth } from '../../services/services'

export const createEmail = async (formData, dispatchLoad, token) => {
  const uriApi = 'contact-email/create-email'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST', token)
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
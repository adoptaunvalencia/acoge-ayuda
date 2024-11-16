import { fetchAuth } from '../../services/services'

export const createEmail = async (formData, dispatchLoad, token, showToast) => {
  const uriApi = 'contact-email/create-email'
  dispatchLoad({ type: 'LOAD_TRUE' })
  try {
    const { response, data } = await fetchAuth(uriApi, formData, 'POST', token)
    if (response.status !== 201) {
      return showToast('error', data.message)
    } else {
      showToast('success', 'Solicitud enviada correctamente.')
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

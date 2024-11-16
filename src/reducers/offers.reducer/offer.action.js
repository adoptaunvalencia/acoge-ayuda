import { fetchAuth } from '../../services/services'

export const fetchOffers = async (uriApi, dispatchLoad, token = null) => {
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi)
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

/* export const fetchFiltersRadius = async () => {
  const response = await fetch()
} */

export const createOffer = async (formData, dispatchLoad, token, showToast) => {
  const uriApi = 'assistance-offer/create-assitances'
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await fetchAuth(uriApi, formData, 'POST', token)
    if (response.status !== 201) {
      return showToast('error', data.message)
    } else {
      showToast('success', 'Oferta de asistencia creada❤️')
      return data
    }
  } catch (error) {
    return showToast('error', data.message)
  } finally {
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }
}

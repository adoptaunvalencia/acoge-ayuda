import { fetchAuth } from '../../services/services'

export const fetchOffers = async (uriApi, dispatchOffer, dispatchLoad) => {
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
    dispatchLoad({ type: 'LOAD_FALSE' })
  }
}
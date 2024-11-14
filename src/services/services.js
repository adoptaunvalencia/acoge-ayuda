export const fetchAuth = async (
  urlApi,
  formFields = {},
  method = 'GET',
  token = null
) => {
  const url = `${import.meta.env.VITE_URL_API}`

  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const options = {
      method,
      headers
    }
    if (method !== 'GET') {
      options.body = JSON.stringify(formFields)
    }
    const response = await fetch(`${url}/${urlApi}`, options)
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}

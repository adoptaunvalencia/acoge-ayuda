import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../contexts/reducer.contexts/ReducerContext'

const useFetch = ({
  uri,
  method = 'GET',
  body = null,
  token = null,
  queryParams = null,
  isFileUpload = false
}) => {
  const [data, setData] = useState(null)
  const [stateLoad, dispatchLoad] = useContext(ReducerContext)

  const buildUrl = () => {
    let finalUrl = uri
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString()
      finalUrl = `${uri}?${queryString}`
    }
    return finalUrl
  }
  useEffect(() => {
    const fetchData = async () => {
      dispatchLoad({ type: 'LOAD_TRUE' })
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
      if (body) {
        if (isFileUpload) {
          const formData = new FormData()
          Object.keys(body).forEach((key) => {
            formData.append(key, body[key])
          })
          options.body = formData
        } else if (method === 'POST' || method === 'PUT') {
          options.body = JSON.stringify(body)
        }
      }
      try {
        const response = await fetch(buildUrl(), options)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        dispatchLoad({ type: 'SET_ERROR', payload: error.message })
      } finally {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }
    }
    fetchData()
  }, [uri, method, body, token, queryParams, isFileUpload])

  return { data, stateLoad }
}
export default useFetch

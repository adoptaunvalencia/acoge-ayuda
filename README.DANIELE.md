# `useFetch` Custom Hook Documentation

## **Description**

`useFetch` is a custom React hook that simplifies making HTTP requests. It supports multiple HTTP methods (`GET`, `POST`, `PUT`, `PATCH`) and can handle both JSON requests and file uploads. It also supports dynamic query parameters. The hook manages the loading state, data state, and error handling, and integrates with a global context to handle loading indicators in your application.

## **Parameters**

The hook takes an object with the following parameters:

1. **`uri`** (string): The URL to send the request to (required).
2. **`method`** (string, default: `'GET'`): The HTTP method for the request. Common methods include:
   - `'GET'`: To fetch data.
   - `'POST'`: To send data to the server, often used for creating new resources.
   - `'PUT'`: To update an existing resource.
   - `'PATCH'`: To partially update an existing resource.
3. **`body`** (any, default: `null`): The payload to send in the request body. Can be an object, array, or FormData for file uploads. For non-file requests, the body is serialized into JSON.
4. **`token`** (string, default: `null`): An optional Bearer token for authorization. If provided, it will be included in the `Authorization` header.
5. **`queryParams`** (object, default: `null`): An optional object representing query parameters to append to the request URL. These parameters will be serialized into the query string.
6. **`isFileUpload`** (boolean, default: `false`): Set to `true` if you need to upload files (e.g., for an avatar or image). This will use `FormData` for sending the request body.

## **Usage Example**

To use the `useFetch` hook to update a user's avatar image, you can call it as follows:

- Example code for uploading the avatar

```js
const { data, stateLoad } = useFetch({
  uri: 'https://developer-proyect-dana.vercel.app/secure/api/v1/user',
  method: 'PUT',
  body: { avatar: selectedImage },
  token: 'token',
  isFileUpload: true
})
```

## Example Explanation

In this example:

- **The URI** is the URL where you are sending the request.
- **The method** is `'PATCH'` because you want to update the user's avatar.
- **The body** contains the avatar data (in this case, the image file).
- **The token** is your Bearer token for authorization.
- **The `isFileUpload`** is set to `true` because you are uploading an image.

### Returns

The hook returns an object with the following properties:

- `data`: The data returned from the server (e.g., updated user information).
- `stateLoad`: The loading state from the global context.

### Notes

- If you want to upload a file (e.g., an avatar), ensure `isFileUpload` is set to `true`.
- The body will be serialized to JSON for non-file requests, and `FormData` will be used for file uploads.

## Example: Fetching Assistance Offers with Query Parameters

To fetch assistance offers with filters, such as location-based offers for food, you can use the `useFetch` hook with query parameters. Here’s how you would set it up:

```js
const queryParams = {
  useLocation: true,
  lat: 40.7128, // Latitude of the location
  lon: -74.006, // Longitude of the location
  distance: 10, // Distance in km
  assistanceType: 'food', // Type of assistance (food)
  page: 1, // Page number for pagination
  limit: 10 // Number of results per page
}

const { data, stateLoad } = useFetch({
  uri: 'https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/filter',
  method: 'GET',
  queryParams: queryParams // Sending query parameters as part of the request
})
```

## Example Explanation

In this example:

- **The `uri`** is the endpoint to fetch the assistance offers.
- **The `queryParams`** are passed in the object to filter the offers by location, type of assistance, and pagination.
- The `useFetch` hook sends a GET request with the query parameters and returns the filtered data along with the loading state.

### Returns

- `data`: The filtered data (assistance offers).
- `stateLoad`: The loading state, which you can use to display a loading spinner or message.

## `useScrollToRef` Hook

The `useScrollToRef` hook allows you to smoothly scroll to a specific element on the page by passing a reference to that element. This can be useful for improving navigation and providing a better user experience by focusing attention on certain parts of the page.

### Example

```jsx
import useScrollToRef from '/hooks/useScrollToRef'
const MyComponent = () => {
  const scrollToRef = useScrollToRef()
}
const handleScroll = () => {
  scrollToRef(targetRef)
}
//!OR

useEffect(() => {
  setTimeOut(() => {
    scrollToRef(targetRef)
  }, 500)
}, [])
```

### Explanation

- **`scrollToRef(ref)`**: When called, this function scrolls smoothly to the element referenced by `ref`.

- **Parameters**:

  - `ref` (React ref): The reference to the target element to which you want to scroll.

- **Return Value**: Returns the `scrollToRef` function to be used in the component.

### Important Notes

- The `scrollToRef` function uses `scrollIntoView` to scroll the element into view, with smooth scrolling and aligned to the start of the viewport.
- If the `ref` is not attached to a valid DOM element, the function will do nothing.

# Global Reducer Context

The `ReducerProvider` component creates a global context, `ReducerContext`, providing centralized state management across the application for loading, authentication, and offers data. This is accomplished through three separate reducers:

### Reducers Overview

- **Loader Reducer**: Handles loading states to indicate when asynchronous operations, like data fetching, are in progress.
- **Auth Reducer**: Manages user authentication status and user details.
- **Offers Reducer**: Manages offer-related data, such as lists of offers and individual offer details.

Each reducer is initialized with its own initial state and managed through respective actions.

### Code Overview

The `ReducerProvider` component initializes each reducer using `useReducer` and provides the following state variables and dispatch methods globally:

- **`stateLoad`** and **`dispatchLoad`** - Loading state and dispatch.
- **`stateIsAuth`** and **`dispatchIsAuth`** - Authentication state and dispatch.
- **`stateOffer`** and **`dispatchOffer`** - Offers data state and dispatch.

```jsx
import { useReducer, createContext } from 'react'
import {
  stateLoader,
  initStateLoader
} from '../../reducers/loader.reducer/loader'
import {
  stateAuth,
  initStateAuth
} from '../../reducers/auth.reducer/auth.reducer'
import {
  initStateOffers,
  stateOffers
} from '../../reducers/offers.reducer/offer.reducer'

export const ReducerContext = createContext()

export const ReducerProvider = ({ children }) => {
  const [stateLoad, dispatchLoad] = useReducer(stateLoader, initStateLoader)
  const [stateIsAuth, dispatchIsAuth] = useReducer(stateAuth, initStateAuth)
  const [stateOffer, dispatchOffer] = useReducer(stateOffers, initStateOffers)

  return (
    <ReducerContext.Provider
      value={{
        stateLoad,
        dispatchLoad,
        stateIsAuth,
        dispatchIsAuth,
        stateOffer,
        dispatchOffer
      }}
    >
      {children}
    </ReducerContext.Provider>
  )
}
```

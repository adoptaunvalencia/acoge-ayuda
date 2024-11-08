export const initStateLoader = { load: false }

export const stateLoader = (state, action) => {
  switch (action.type) {
    case 'LOAD_TRUE':
      return { ...state, loading: true }
    case 'LOAD_FALSE':
      return { ...state, loading: false }

    default:
      state
  }
}

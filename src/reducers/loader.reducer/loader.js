export const initStateLoader = { load: false }

export const stateLoader = (state, action) => {
  switch (action.type) {
    case 'LOAD_TRUE':
      return { ...state, load: true }
    case 'LOAD_FALSE':
      return { ...state, load: false }

    default:
      state
  }
}

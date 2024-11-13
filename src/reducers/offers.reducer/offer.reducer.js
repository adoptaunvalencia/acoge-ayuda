export const initStateOffers = {
  offers: [],
  offer: {},
  offers_map:[]
}

export const stateOffers = (state, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return { ...state, offers: action.payload }
    case 'SET_OFFER':
      return { ...state, offer: action.payload }
    case 'SET_OFFERS_MAP':
      return { ...state, offers_map: action.payload }
    default:
      return state
  }
}

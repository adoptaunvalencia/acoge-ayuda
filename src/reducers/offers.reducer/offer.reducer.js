export const initStateOffers = {
  offers: [],
  offer: []
}

export const stateOffers = (state, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return { ...state, offers: action.payload }
    case 'SET_OFFER':
      return { ...state, offer: action.payload }
    default:
      return state
  }
}

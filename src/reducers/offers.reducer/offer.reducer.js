export const initStateOffers = {
  offers: [],
  offer: []
}

export const stateOffers = () => {
  switch ((state, action)) {
    case 'SET_OFFERS':
      return { ...state, offers: action.payload }
    case 'SET_OFFER':
      return { ...state, offer: action.payload }
    default:
      return satete
  }
}

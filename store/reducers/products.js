import { acc } from 'react-native-reanimated'

import PRODUCTS from '../../data/dummy-data'

const InitialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (state = InitialState, action) => {
  return state
}

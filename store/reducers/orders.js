import Order from '../../models/order'
import { ADD_ORDER, SET_ORDERS } from '../actions/orders'

const initalState = {
  orders: [],
}

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      )

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      }

    default:
      return state
  }
}

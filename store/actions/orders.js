import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const responce = await fetch(
        'https://expo-test-53812.firebaseio.com/orders/u1.json'
      )

      if (!responce.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await responce.json()

      const loadedOrders = []

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        )
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw err
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date()
    const responce = await fetch(
      'https://expo-test-53812.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          dete: date.toISOString(),
        }),
      }
    )
    const resData = await responce.json()
    if (!responce.ok) {
      throw new Error('Something went wrong')
    }

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    })
  }
}

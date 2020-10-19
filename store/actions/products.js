export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'
import Product from '../../models/product'
export const fetchProducts = () => {
  try {
    return async (dispatch, getState) => {
      const responce = await fetch(
        'https://expo-test-53812.firebaseio.com/products.json'
      )
      const userId = getState().auth.userId
      if (!responce.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await responce.json()
      const loadedProducts = []

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        )
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      })
    }
  } catch (err) {
    throw err
  }
}
export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const responce = await fetch(
      `https://expo-test-53812.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    )
    if (!responce.ok) {
      throw new Error('Something went wrong')
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId })
  }
}

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const responce = await fetch(
      `https://expo-test-53812.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    )
    const resData = await responce.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    })
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const responce = await fetch(
      `https://expo-test-53812.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    )
    if (!responce.ok) {
      throw new Error('Something went wrong')
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    })
  }
}

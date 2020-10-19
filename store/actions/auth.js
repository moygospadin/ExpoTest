import { AsyncStorage } from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authentice = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId,
    token,
  }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQ0n22WjcUcbFgt6RXhkQMl-ipSup5ZdU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!'
      }
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch(authentice(resData.localId, resData.idToken))

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQ0n22WjcUcbFgt6RXhkQMl-ipSup5ZdU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!'
      }
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch(authentice(resData.localId, resData.idToken))
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  )
}

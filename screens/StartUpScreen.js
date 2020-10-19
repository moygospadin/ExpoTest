import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth'

const StartUpScreen = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'))
      if (!userData) {
        props.navigation.navigate('Auth')
        return
      }
      const { token, userId, expiryDate } = userData
      const expirationDate = new Date(expiryDate)
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return
      }
      dispatch(authActions.authentice(userId, token))
      props.navigation.navigate('Shop')
    }
    tryLogin()
  }, [])
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default StartUpScreen

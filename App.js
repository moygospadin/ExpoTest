import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native'

export default function App() {
  const opacity = useRef(new Animated.Value(0)).current

  function fadeInBall() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }
  function fadeOutBall() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              opacity,
              backgroundColor: 'red',
            },
          ]}
        />
        <TouchableOpacity onPress={fadeOutBall}>
          <Text>Fade out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fadeInBall}>
          <Text>Fade in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

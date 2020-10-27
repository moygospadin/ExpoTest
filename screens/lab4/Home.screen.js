import React, { useRef, useState } from 'react'
import { View, Button, Image, Animated, TextInput, Text } from 'react-native'

import ball from '../../assets/ball.png'
import styles from './Home.styles'

export function lab4() {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const [opacityAnimationTime, setOpacityAnimationTime] = useState('1000')
  const [rotationAnimationTime, setRotationAnimationTime] = useState('2000')

  const syncAnimation = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 36,
        duration: +rotationAnimationTime,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: +opacityAnimationTime,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: +opacityAnimationTime,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: +rotationAnimationTime,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  const asyncAnimation = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 36,
        duration: +rotationAnimationTime,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: +opacityAnimationTime,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: +opacityAnimationTime,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: +rotationAnimationTime,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  const rotateAnimation = () => {
    Animated.timing(rotateAnim, {
      toValue: 36,
      duration: +rotationAnimationTime,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: +rotationAnimationTime,
        useNativeDriver: true,
      }).start()
    })
  }

  const opacityAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: +opacityAnimationTime,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: +opacityAnimationTime,
        useNativeDriver: true,
      }).start()
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              rotate: rotateAnim,
            },
          ],
        }}
      >
        <Image style={styles.ball} source={ball} />
      </Animated.View>
      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.text}>Opacity</Text>
          <TextInput
            style={styles.input}
            onChangeText={(v) => setOpacityAnimationTime(v)}
            value={opacityAnimationTime}
          />
        </View>
        <View>
          <Text style={styles.text}>Rotation</Text>
          <TextInput
            style={styles.input}
            onChangeText={(v) => setRotationAnimationTime(v)}
            value={rotationAnimationTime}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            onPress={() => rotateAnimation()}
            title="Rotate"
            color="black"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => opacityAnimation()}
            title="Change opacity"
            color="black"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => syncAnimation()}
            title="Sync animation"
            color="black"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => asyncAnimation()}
            title="Async animation"
            color="black"
          />
        </View>
      </View>
    </View>
  )
}

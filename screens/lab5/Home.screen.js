import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

import styles from './Home.styles'

export function lab5() {
  const [image, setImage] = useState(null)
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    ;(async () => {
      if (Constants.platform.android) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.cancelled) {
      let width
      let height
      if (result.width >= result.height) {
        width = 300
        height = (result.height * width) / result.width
      } else {
        height = 300
        width = (result.width * height) / result.height
      }
      setSize({ width, height })
      setImage(result.uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Pick an image" onPress={pickImage} color="black" />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: size.width, height: size.height }}
        />
      )}
    </View>
  )
}

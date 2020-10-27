import React, { useState } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native'

import catImage from '../../assets/cat.jpg'
import styles from './Home.styles'

export function lab3() {
  const buttonsArray = [
    {
      label: 'Green',
      style: 'green',
    },
    {
      label: 'Red',
      style: 'red',
    },
    {
      label: 'Blue',
      style: 'blue',
    },
    {
      label: 'Yellow',
      style: 'yellow',
    },
  ]

  const [currentColor, setCurrentColor] = useState(buttonsArray[0].style)
  const [isImage, setIsImage] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const container = StyleSheet.compose(styles.container, styles[currentColor])

  const renderButtons = () => {
    return buttonsArray.map((el) => {
      return (
        <View style={styles.button} key={`button-${el.label}`}>
          <Button
            onPress={() => {
              setCurrentColor(el.style),
                setIsImage(false),
                setModalVisible(true)
            }}
            title={el.label}
            color="#202020"
          />
        </View>
      )
    })
  }

  return (
    <View style={container}>
      {isImage ? (
        <ImageBackground source={catImage} style={styles.image}>
          {renderButtons()}
          <View style={styles.button}>
            <Button
              onPress={() => {
                setIsImage(false), setModalVisible(true)
              }}
              title={'Hide cat :('}
              color="#202020"
            />
          </View>
        </ImageBackground>
      ) : (
        <View>
          {renderButtons()}
          <View style={styles.button}>
            <Button
              onPress={() => {
                setIsImage(true), setModalVisible(true)
              }}
              title={'Show cat (:'}
              color="#202020"
            />
          </View>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hello, {isImage ? 'cat' : currentColor}!
            </Text>
            <View style={{ ...styles.openButton }}>
              <Button
                title="Hide"
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
                color="black"
              ></Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

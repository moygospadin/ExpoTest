import React, { useState } from 'react'
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const imageTakenHanlder = (imagePath) => {
    setSelectedImage(imagePath)
  }
  const titleChangeHanlder = (text) => {
    setTitleValue(text)
  }
  const dispatch = useDispatch()
  const savePlaceHanlder = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage))
    props.navigation.goBack()
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHanlder}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHanlder} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHanlder}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
}

export default NewPlaceScreen

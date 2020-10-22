import React from 'react'
import { TouchableNativeFeedback, StyleSheet, Image } from 'react-native'
import ENV from '../env'

const MapPreview = (props) => {
  let imagePreviewUrl
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`
  }
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
})

export default MapPreview

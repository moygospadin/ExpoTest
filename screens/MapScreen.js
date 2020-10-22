import React, { useCallback, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState()
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  let marketCoordinates
  if (selectedLocation) {
    marketCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }
  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocation}>
      {marketCoordinates && (
        <Marker title="Picked Location" coordinate={marketCoordinates}></Marker>
      )}
    </MapView>
  )
}

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation')
  return {
    headerRight: () => <HeaderRightButton saveFn={saveFn} />,
  }
}

const HeaderRightButton = ({ saveFn }) => {
  return (
    <TouchableOpacity
      delayPressIn={30}
      style={styles.headerButton}
      onPress={saveFn}
    >
      <Text style={styles.headerButtonText}>Save</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  map: { flex: 1 },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'white',
    paddingRight: 10,
  },
})

export default MapScreen

import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

function PlacesListScreen(props) {
  const places = useSelector((state) => state.places.places)
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }}
        />
      )}
    />
  )
}

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName="md-add"
          onPress={() => {
            navData.navigation.navigate('NewPlace')
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({})

export default PlacesListScreen

import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import { setFilters } from '../store/actions/meal'
const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor, false: Colors.accentColor }}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  )
}

const FiltersScreen = (props) => {
  const { navigation } = props

  const [isGlutenFree, setisGlutenFree] = useState(false)
  const [isLactoseFree, setisLactoseFree] = useState(false)
  const [isVegan, setisVegan] = useState(false)
  const [isVegetarian, setisVegetarian] = useState(false)
  const dispatch = useDispatch()
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian,
    }
    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}> Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten Free"
        state={isGlutenFree}
        onChange={(newValue) => setisGlutenFree(newValue)}
      />

      <FilterSwitch
        label="Lactose Free"
        state={isLactoseFree}
        onChange={(newValue) => setisLactoseFree(newValue)}
      />

      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setisVegan(newValue)}
      />

      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setisVegetarian(newValue)}
      />
    </View>
  )
}

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
})

export default FiltersScreen

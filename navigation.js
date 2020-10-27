import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { lab1 } from './screens/lab1/Home.screen'
import { lab2 } from './screens/lab2/Home.screen'
import { lab3 } from './screens/lab3/Home.screen'
import { lab4 } from './screens/lab4/Home.screen'
import { lab5 } from './screens/lab5/Home.screen'
import { lab6 } from './screens/lab6/Home.screen'
import { lab7 } from './screens/lab7/Home.screen'
import { lab8 } from './screens/lab8/Home.screen'
import { NavigationContainer } from '@react-navigation/native'
const Drawer = createDrawerNavigator()

function MainNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="lab1" component={lab1} />
        <Drawer.Screen name="lab2" component={lab2} />
        <Drawer.Screen name="lab3" component={lab3} />
        {/* <Drawer.Screen name="lab4" component={lab4} /> */}
        <Drawer.Screen name="lab5" component={lab5} />
        {/* <Drawer.Screen name="lab6" component={lab6} /> */}
        <Drawer.Screen name="lab7" component={lab7} />
        <Drawer.Screen name="lab8" component={lab8} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigator

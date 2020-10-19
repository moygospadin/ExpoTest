import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../constants/Colors'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { forHorizontalModal } from '../animations/StackNavigator'
import CartScreen from '../screens/shop/CartScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth'
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1500,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: forHorizontalModal,
      gestureEnabled: true,
      transitionSpec: {
        open: config,
        close: config,
      },
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
  }
)

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch()
      return (
        <View
          style={{
            flex: 1,
            paddingTop: 40,
          }}
        >
          <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <DrawerItems {...props} />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: 10,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout())
                  props.navigation.navigate('Auth')
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )
    },
  }
)
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
)

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
})
export default createAppContainer(MainNavigator)

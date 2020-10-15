import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import CartItem from './CartItem'
import Colors from '../../constants/Colors'

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date.toString()}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={!showDetails ? 'Show Details' : 'Hide Details'}
        onPress={() => {
          setShowDetails((prev) => !prev)
        }}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  detailItem: {
    width: '100%',
  },
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
})

export default OrderItem
